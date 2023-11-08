/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChatResponse } from '../../models/chat-response';

export interface GetChatChatThreadIdGet$Params {
  thread_id: string;
}

export function getChatChatThreadIdGet(http: HttpClient, rootUrl: string, params: GetChatChatThreadIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatResponse>> {
  const rb = new RequestBuilder(rootUrl, getChatChatThreadIdGet.PATH, 'get');
  if (params) {
    rb.path('thread_id', params.thread_id, {});
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

getChatChatThreadIdGet.PATH = '/chat/{thread_id}';
