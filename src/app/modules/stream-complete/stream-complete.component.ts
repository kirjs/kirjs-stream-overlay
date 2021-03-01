import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { StreamConfigService } from '../admin/waiting-screen-editor/stream-config.service';

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './stream-complete.component.html',
  styleUrls: ['./stream-complete.component.scss'],
})
export class StreamCompleteComponent implements OnInit {
  constructor(public readonly waitingService: StreamConfigService) {}

  ngOnInit(): void {}
}
