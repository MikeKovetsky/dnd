/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChatResponse } from '../../models/chat-response';
import { NewMessageRequest } from '../../models/new-message-request';

export interface ReplyChatChatPut$Params {
      body: NewMessageRequest
}

export function replyChatChatPut(http: HttpClient, rootUrl: string, params: ReplyChatChatPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatResponse>> {
  const rb = new RequestBuilder(rootUrl, replyChatChatPut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ChatResponse>;
    })
  );
}

replyChatChatPut.PATH = '/chat';
