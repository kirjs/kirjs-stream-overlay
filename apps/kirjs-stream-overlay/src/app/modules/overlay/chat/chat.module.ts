import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';

@NgModule({
    exports: [ChatComponent],
    imports: [CommonModule, ChatComponent],
})
export class ChatModule {}
