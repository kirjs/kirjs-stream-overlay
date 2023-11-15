import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarModule } from './bar/bar.module';
import { ChatModule } from './chat/chat.module';
import { OverlayComponent } from './overlay.component';

@NgModule({
    imports: [CommonModule, BarModule, ChatModule, OverlayComponent],
})
export class OverlayModule {}
