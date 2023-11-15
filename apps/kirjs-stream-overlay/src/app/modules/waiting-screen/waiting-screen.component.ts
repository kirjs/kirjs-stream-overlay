import { Component, Input } from '@angular/core';
import { StreamConfigService } from '../admin/stream-manager/stream-config.service';
import { UIStream } from '../admin/stream-manager/types';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-waiting-screen',
    templateUrl: './waiting-screen.component.html',
    styleUrls: ['./waiting-screen.component.scss'],
    standalone: true,
    imports: [NgIf],
})
export class WaitingScreenComponent {
  @Input() stream!: UIStream;

  constructor(public readonly waitingService: StreamConfigService) {}
}
