import { Component, OnInit } from '@angular/core';
import { TwitchClient } from '../../../twitch';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StreamConfigService } from '../../admin/waiting-screen-editor/stream-config.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  timeout = 30000;

  constructor(
    readonly waitingService: StreamConfigService,
    readonly twitch: TwitchClient,
  ) {}

  ngOnInit(): void {}
}
