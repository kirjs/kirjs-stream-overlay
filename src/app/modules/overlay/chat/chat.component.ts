import { Component, OnInit } from '@angular/core';
import { TwitchService } from '../../admin/services/twitch';
import { StreamConfigService } from '../../admin/stream-manager/stream-config.service';
import {ChatService} from "./chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    readonly streamConfigService: StreamConfigService,
    readonly chatService: ChatService,
  ) {}

  ngOnInit(): void {}
}
