import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Message } from "../../openapi/dnd/models/message";
import { NewMessageRequest } from "../../openapi/dnd/models/new-message-request";
import { ApiService } from "../../openapi/dnd/services/api.service";

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  message = new FormControl<string>('');
  threadId!: string;
  isLoading = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {
  }


  messages: Message[] = [];

  ngOnInit() {
    const raw = this.route.snapshot.queryParamMap.get('threadId');
    if (raw) {
      this.threadId = raw;
      this.getChat(this.threadId);
    } else {
      this.createChat();
    }
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
    this.searchInput.nativeElement.scrollIntoView()
  }

  sendMessage(text: string | null) {
    if (!text || this.isLoading) {
      return;
    }

    this.message.setValue("");
    this.isLoading = true;

    const message: Message = {
      text: text,
      role: 'user',
      type: 'text',
    }

    this.messages.push(message);
    this.scrollToBottom();

    const body: NewMessageRequest = {
      message: message,
      thread_id: this.threadId,
    }
    this.api.replyChatChatPut({body}).pipe(
      untilDestroyed(this),
    ).subscribe((chat) => {
      this.isLoading = false;
      this.scrollToBottom();
      this.searchInput.nativeElement.scrollIntoView()
      this.messages = chat.messages.map((message) => this.formatMessage(message));
    });
  }

  private createChat() {
    this.api.createChatChatPost({}).pipe(
      untilDestroyed(this),
    ).subscribe((chat) => {
      this.threadId = chat.thread_id;
      this.router.navigate([''], {
        relativeTo: this.route,
        queryParams: {threadId: chat.thread_id},
        queryParamsHandling: 'merge',
      })
      this.message.setValue("Let's start now!");
      this.isLoading = false;
    });
  }

  private getChat(surveyId: string) {
    this.api.getChatChatThreadIdGet({thread_id: surveyId}).pipe(
      untilDestroyed(this),
    ).subscribe((chat) => {
      this.messages = chat.messages.map((message) => this.formatMessage(message));
      if (this.messages.length === 0) {
        this.message.setValue("Let's start now!");
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.messages.push({
        role: 'assistant',
        text: "Sorry, we couldn't answer this. Refresh the page and try again.",
        type: 'text',
      })
    });
  }

  private formatMessage(message: Message): Message {
    if (message.type === 'image') {
      return {
        role: message.role,
        text: message.text,
        type: message.type,
      }
    }
    let htmlText = message.text.replace(/\n\n/g, '<br><br>');
    return {
      role: message.role,
      text: htmlText,
      type: message.type,
    }

  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.searchInput.nativeElement.scrollIntoView()
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 50);

  }

}
