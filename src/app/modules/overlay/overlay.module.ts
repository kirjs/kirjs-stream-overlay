import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarModule } from './bar/bar.module';
import { ChatModule } from './chat/chat.module';
import { OverlayComponent } from './overlay.component';

@NgModule({
  declarations: [OverlayComponent],
  imports: [CommonModule, BarModule, ChatModule],
})
export class OverlayModule {}
