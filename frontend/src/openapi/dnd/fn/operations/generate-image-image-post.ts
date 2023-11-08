/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ImageRequest } from '../../models/image-request';
import { ImageResponse } from '../../models/image-response';

export interface GenerateImageImagePost$Params {
      body: ImageRequest
}

export function generateImageImagePost(http: HttpClient, rootUrl: string, params: GenerateImageImagePost$Params, context?: HttpContext): Observable<StrictHttpResponse<ImageResponse>> {
  const rb = new RequestBuilder(rootUrl, generateImageImagePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ImageResponse>;
    })
  );
}

generateImageImagePost.PATH = '/image';
