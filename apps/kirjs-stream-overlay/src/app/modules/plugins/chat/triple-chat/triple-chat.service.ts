import { Injectable } from '@angular/core';
import { ChatMessage } from '../../../overlay/chat/types';
import { ChatPlugin } from '../../plugins';

@Injectable({
  providedIn: 'root',
})
export class TripleChatService extends ChatPlugin {
  constructor() {
    super();
  }

  onMessage(message: ChatMessage): void {
    if (message.text.match(/^!refresh/)) {
      window.location.reload();
    }
  }
}
