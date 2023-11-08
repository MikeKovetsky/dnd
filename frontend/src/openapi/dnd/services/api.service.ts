/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ChatResponse } from '../models/chat-response';
import { createChatChatPost } from '../fn/operations/create-chat-chat-post';
import { CreateChatChatPost$Params } from '../fn/operations/create-chat-chat-post';
import { generateImageImagePost } from '../fn/operations/generate-image-image-post';
import { GenerateImageImagePost$Params } from '../fn/operations/generate-image-image-post';
import { getChatChatThreadIdGet } from '../fn/operations/get-chat-chat-thread-id-get';
import { GetChatChatThreadIdGet$Params } from '../fn/operations/get-chat-chat-thread-id-get';
import { ImageResponse } from '../models/image-response';
import { NewChatResponse } from '../models/new-chat-response';
import { replyChatChatPut } from '../fn/operations/reply-chat-chat-put';
import { ReplyChatChatPut$Params } from '../fn/operations/reply-chat-chat-put';
import { rootGet } from '../fn/operations/root-get';
import { RootGet$Params } from '../fn/operations/root-get';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `rootGet()` */
  static readonly RootGetPath = '/';

  /**
   * Root.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rootGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  rootGet$Response(params?: RootGet$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return rootGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Root.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rootGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rootGet(params?: RootGet$Params, context?: HttpContext): Observable<any> {
    return this.rootGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `generateImageImagePost()` */
  static readonly GenerateImageImagePostPath = '/image';

  /**
   * Generate Image.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateImageImagePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generateImageImagePost$Response(params: GenerateImageImagePost$Params, context?: HttpContext): Observable<StrictHttpResponse<ImageResponse>> {
    return generateImageImagePost(this.http, this.rootUrl, params, context);
  }

  /**
   * Generate Image.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generateImageImagePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generateImageImagePost(params: GenerateImageImagePost$Params, context?: HttpContext): Observable<ImageResponse> {
    return this.generateImageImagePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<ImageResponse>): ImageResponse => r.body)
    );
  }

  /** Path part for operation `getChatChatThreadIdGet()` */
  static readonly GetChatChatThreadIdGetPath = '/chat/{thread_id}';

  /**
   * Get Chat.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChatChatThreadIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatChatThreadIdGet$Response(params: GetChatChatThreadIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatResponse>> {
    return getChatChatThreadIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get Chat.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getChatChatThreadIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatChatThreadIdGet(params: GetChatChatThreadIdGet$Params, context?: HttpContext): Observable<ChatResponse> {
    return this.getChatChatThreadIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<ChatResponse>): ChatResponse => r.body)
    );
  }

  /** Path part for operation `replyChatChatPut()` */
  static readonly ReplyChatChatPutPath = '/chat';

  /**
   * Reply Chat.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `replyChatChatPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replyChatChatPut$Response(params: ReplyChatChatPut$Params, context?: HttpContext): Observable<StrictHttpResponse<ChatResponse>> {
    return replyChatChatPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Reply Chat.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `replyChatChatPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replyChatChatPut(params: ReplyChatChatPut$Params, context?: HttpContext): Observable<ChatResponse> {
    return this.replyChatChatPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<ChatResponse>): ChatResponse => r.body)
    );
  }

  /** Path part for operation `createChatChatPost()` */
  static readonly CreateChatChatPostPath = '/chat';

  /**
   * Create Chat.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createChatChatPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  createChatChatPost$Response(params?: CreateChatChatPost$Params, context?: HttpContext): Observable<StrictHttpResponse<NewChatResponse>> {
    return createChatChatPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Chat.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createChatChatPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createChatChatPost(params?: CreateChatChatPost$Params, context?: HttpContext): Observable<NewChatResponse> {
    return this.createChatChatPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewChatResponse>): NewChatResponse => r.body)
    );
  }

}
