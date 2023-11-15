import { Component, computed, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StreamConfigService } from '../../admin/stream-manager/stream-config.service';
import { ChatService } from './chat.service';
import { RewardService } from './reward.service';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  standalone: true,
  imports: [AsyncPipe],
})
export class ChatComponent implements OnInit {
  private readonly currentStream = toSignal(
    this.streamConfigService.currentStream$,
    {
      initialValue: undefined,
    },
  );

  protected readonly shouldShowChat = computed(
    () => this.currentStream()?.showChat ?? false,
  );

  constructor(
    readonly streamConfigService: StreamConfigService,
    readonly chatService: ChatService,
  ) {}

  ngOnInit(): void {}

  postMessage(message: string): void {
    this.chatService.postMessage(message);
  }
}
