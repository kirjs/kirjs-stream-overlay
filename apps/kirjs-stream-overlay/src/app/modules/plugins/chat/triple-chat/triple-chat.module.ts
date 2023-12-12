import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatPlugin } from '../../plugins';
import { TripleChatService } from './triple-chat.service';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: ChatPlugin,
      useClass: TripleChatService,
      multi: true,
    },
  ],
  imports: [CommonModule],
})
export class TripleChatModule {}
