import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { BarComponent } from './bar/bar.component';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
  standalone: true,
  imports: [BarComponent, ChatComponent],
})
export class OverlayComponent {}
