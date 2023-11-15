import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StreamConfigService } from '../../admin/stream-manager/stream-config.service';
import { ChatService } from './chat.service';
import { RewardService } from './reward.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class ChatComponent implements OnInit {
  readonly shouldShowChat$ = this.streamConfigService.currentStream$.pipe(
    map(stream => {
      // tslint:disable-next-line:no-non-null-assertion
      return stream!.showChat;
    }),
  );

  constructor(
    readonly streamConfigService: StreamConfigService,
    readonly chatService: ChatService,
    readonly rewardService: RewardService,
  ) {}

  ngOnInit(): void {}

  postMessage(message: string): void {
    this.chatService.postMessage(message);
  }
}
