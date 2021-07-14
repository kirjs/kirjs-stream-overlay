import { Component, OnInit } from '@angular/core';
import { StreamConfigService } from '../admin/stream-manager/stream-config.service';

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './stream-complete.component.html',
  styleUrls: ['./stream-complete.component.scss'],
})
export class StreamCompleteComponent implements OnInit {
  constructor(public readonly waitingService: StreamConfigService) {}

  ngOnInit(): void {}
}
