import {Component, OnInit} from '@angular/core';
import {StreamConfigService} from '../../admin/stream-manager/stream-config.service';
import {ChatService} from './chat.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  readonly shouldShowChat$ = this.streamConfigService.currentStream$.pipe(map(stream => {
    // tslint:disable-next-line:no-non-null-assertion
    return stream!.showChat;
  }));

  constructor(
    readonly streamConfigService: StreamConfigService,
    readonly chatService: ChatService,
  ) {
  }

  ngOnInit(): void {
  }
}
