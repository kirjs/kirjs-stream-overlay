import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { StreamConfigService } from '../admin/waiting-screen-editor/stream-config.service';

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.scss'],
})
export class WaitingScreenComponent implements OnInit {
  constructor(public readonly waitingService: StreamConfigService) {}

  ngOnInit(): void {}
}
