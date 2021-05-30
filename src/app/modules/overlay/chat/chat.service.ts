import {Injectable} from '@angular/core';
import {interval, merge, Observable} from 'rxjs';
import {TwitchService} from '../../admin/services/twitch';
import {filter, map, scan, switchMap} from 'rxjs/operators';
import {YoutubeService} from '../../admin/services/youtube.service';
import {StreamConfigService} from '../../admin/stream-manager/stream-config.service';
import {ChatMessage} from './types';
import {maxChatTimeout} from './common';


const now$ = interval(1000).pipe(map(() => Number(Date.now())));


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly youtubeChat$ = this.streamConfigService.currentStream$
    .pipe(
      filter(stream => !!stream && !!stream.lapteuhYoutubeLiveChatId),
      switchMap(currentStream => {
        return this.youtube.fetchChat(currentStream!.lapteuhYoutubeLiveChatId);
      })
    );

  readonly latestMessages$: Observable<ChatMessage[]> = merge(
    this.twitch.messages$,
    this.youtubeChat$
  )
    .pipe(scan((messages: ChatMessage[], message) => {
      const now = +new Date();
      messages = messages.filter(m => now - Number(m.timestamp) < maxChatTimeout);
      messages.push(...message);
      return messages;
    }, [] as ChatMessage[]));

  chat$: Observable<ChatMessage[]> = this.latestMessages$
    .pipe(map((messages) => {
      return messages
        .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
    }));

  constructor(
    private readonly streamConfigService: StreamConfigService,
    private readonly twitch: TwitchService,
    private readonly youtube: YoutubeService,
  ) {
  }
}
