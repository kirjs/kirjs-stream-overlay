import { Component, OnInit } from '@angular/core';
import { StreamConfigService } from '../admin/stream-manager/stream-config.service';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-waiting-screen',
    templateUrl: './stream-complete.component.html',
    styleUrls: ['./stream-complete.component.scss'],
    standalone: true,
    imports: [NgIf, AsyncPipe],
})
export class StreamCompleteComponent implements OnInit {
  constructor(public readonly waitingService: StreamConfigService) {}

  ngOnInit(): void {}
}
