import { Component, Input } from '@angular/core';
import { StreamConfigService } from '../admin/waiting-screen-editor/stream-config.service';
import { UIStream } from '../admin/waiting-screen-editor/types';

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.scss'],
})
export class WaitingScreenComponent {
  @Input() stream!: UIStream;

  constructor(public readonly waitingService: StreamConfigService) {}
}
