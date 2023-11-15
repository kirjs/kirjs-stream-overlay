import { Component } from '@angular/core';
import { StreamConfigService } from '../admin/stream-manager/stream-config.service';
import { WaitingScreenComponent } from './waiting-screen.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    template: '<app-waiting-screen *ngIf="waitingService.currentStream$ | async as stream" [stream]="stream"></app-waiting-screen>',
    styleUrl: './waiting-screen.component.scss',
    standalone: true,
    imports: [
        NgIf,
        WaitingScreenComponent,
        AsyncPipe,
    ],
})
export class WaitingScreenWrapperComponent {
  constructor(public readonly waitingService: StreamConfigService) {}
}
