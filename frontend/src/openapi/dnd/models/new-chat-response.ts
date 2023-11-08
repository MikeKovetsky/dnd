/* tslint:disable */
/* eslint-disable */
import { Message } from '../models/message';
export interface NewChatResponse {
  messages: Array<Message>;
  thread_id: string;
}
