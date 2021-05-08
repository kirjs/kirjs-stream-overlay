import { Component, OnInit } from '@angular/core';
import { TwitchClient } from '../../admin/services/twitch';
import { StreamConfigService } from '../../admin/stream-manager/stream-config.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  timeout = 30000;

  constructor(
    readonly streamConfigService: StreamConfigService,
    readonly twitch: TwitchClient,
  ) {}

  ngOnInit(): void {}
}
