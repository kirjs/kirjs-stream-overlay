import { ChatMessage } from '../overlay/chat/types';

export abstract class ChatPlugin {
  abstract onMessage(message: ChatMessage): void;
}
