import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Message } from "../../openapi/dnd/models/message";
import { NewMessageRequest } from "../../openapi/dnd/models/new-message-request";
import { ApiService } from "../../openapi/dnd/services/api.service";
import { environment } from "../../environments/environment";

interface PreparedMessage extends Message {
  html?: string;
}

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  message = new FormControl<string>('');
  threadId!: string;
  isLoading = true;
  voiceBase = environment.rootApiUrl + '/voice?text=';
  audioOn = false;
  audioLoading = false;
  playBgMusic = true;
  currentTrackIndex = 0;
  playlist = [
    '/assets/audio/Eternity\'sEnd.mp3',
    '/assets/audio/Elders\' Hearth.mp3',
    '/assets/audio/Gallows\' End.mp3',
    '/assets/audio/Lion\'s Pride.mp3',
    '/assets/audio/Pig and Whistle.mp3',
    '/assets/audio/Stonefire.mp3',
  ];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {
  }


  messages: PreparedMessage[] = [];

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

  playNextTrack() {
    this.currentTrackIndex++;
    if (this.currentTrackIndex >= this.playlist.length) {
      this.currentTrackIndex = 0;
    }
    let audio = this.audioPlayer.nativeElement;
    audio.load();
    audio.play();
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
      this.audioOn = false;
      this.isLoading = false;
      this.scrollToBottom();
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
    }, (e) => {
      this.isLoading = false;
      this.messages.push({
        role: 'assistant',
        html: "Sorry, we couldn't answer this. Refresh the page and try again.",
        text: "Sorry, we couldn't answer this. Refresh the page and try again.",
        type: 'text',
      })
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
      this.scrollToBottom();
    }, () => {
      this.isLoading = false;
      this.messages.push({
        role: 'assistant',
        text: "Sorry, we couldn't answer this. Refresh the page and try again.",
        type: 'text',
      })
    });
  }

  private formatMessage(message: Message): PreparedMessage {
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
      text: message.text,
      html: htmlText,
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
