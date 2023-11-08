/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NewChatResponse } from '../../models/new-chat-response';

export interface CreateChatChatPost$Params {
}

export function createChatChatPost(http: HttpClient, rootUrl: string, params?: CreateChatChatPost$Params, context?: HttpContext): Observable<StrictHttpResponse<NewChatResponse>> {
  const rb = new RequestBuilder(rootUrl, createChatChatPost.PATH, 'post');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<NewChatResponse>;
    })
  );
}

createChatChatPost.PATH = '/chat';
