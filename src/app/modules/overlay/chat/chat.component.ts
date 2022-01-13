import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StreamConfigService } from '../../admin/stream-manager/stream-config.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
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
  ) {}

  ngOnInit(): void {}
  postMessage(message: string): void {
    this.chatService.postMessage(message);
  }
}
