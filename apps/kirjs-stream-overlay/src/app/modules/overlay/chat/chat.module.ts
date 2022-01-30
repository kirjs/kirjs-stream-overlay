import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';

@NgModule({
  declarations: [ChatComponent],
  exports: [ChatComponent],
  imports: [CommonModule],
})
export class ChatModule {}
