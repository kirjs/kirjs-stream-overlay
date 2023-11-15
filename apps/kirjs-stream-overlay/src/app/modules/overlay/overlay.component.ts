import { Component, OnInit } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { BarComponent } from './bar/bar.component';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
    standalone: true,
    imports: [BarComponent, ChatComponent],
})
export class OverlayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
