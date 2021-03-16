import { Component } from '@angular/core';
import { StreamConfigService } from '../admin/waiting-screen-editor/stream-config.service';

@Component({
  template:
    '<app-waiting-screen *ngIf="waitingService.currentStream$ | async as stream" [stream]="stream"></app-waiting-screen>',
  styleUrls: ['./waiting-screen.component.scss'],
})
export class WaitingScreenWrapperComponent {
  constructor(public readonly waitingService: StreamConfigService) {}
}
