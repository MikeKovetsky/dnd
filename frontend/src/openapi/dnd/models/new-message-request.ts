/* tslint:disable */
/* eslint-disable */
import { Message } from '../models/message';
export interface NewMessageRequest {
  message: Message;
  thread_id: string;
}
