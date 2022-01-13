import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, merge, Observable } from 'rxjs';
import { catchError, filter, map, scan, switchMap } from 'rxjs/operators';
import { TwitchService } from '../../admin/services/twitch';
import { YoutubeService } from '../../admin/services/youtube.service';
import { StreamConfigService } from '../../admin/stream-manager/stream-config.service';
import { maxChatTimeout } from './common';
import { ChatMessage } from './types';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  readonly youtubeChat$ = this.streamConfigService.currentStream$.pipe(
    filter(stream => !!stream && !!stream.lapteuhYoutubeLiveChatId),
    switchMap(currentStream => {
      if (!currentStream) {
        return EMPTY;
      }
      return this.youtube.fetchChat(currentStream.lapteuhYoutubeLiveChatId);
    }),
  );

  readonly autoPostToChat$ = this.streamConfigService.currentStream$.pipe(
    map(stream => (stream ? stream.autoPostToChat : false)),
  );

  readonly latestMessages$: Observable<ChatMessage[]> = merge(
    this.twitch.messages$,
    this.youtubeChat$.pipe(
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
    ),
  ).pipe(
    scan((messages: ChatMessage[], message) => {
      const now = +new Date();
      messages = messages.filter(
        m => now - Number(m.timestamp) < maxChatTimeout,
      );
      messages.push(...message);
      return messages;
    }, [] as ChatMessage[]),
  );

  chat$: Observable<ChatMessage[]> = this.latestMessages$.pipe(
    map(messages => {
      return messages.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
    }),
  );

  constructor(
    private readonly streamConfigService: StreamConfigService,
    private readonly twitch: TwitchService,
    private readonly youtube: YoutubeService,
  ) {}

  private readonly postToChat$ = combineLatest([
    this.twitch.isStreamlive$,
    this.autoPostToChat$,
  ]);

  postMessage() {
    const message = 't.me/kirjs_ru_chat';
    return this.twitch.postMessage(message);
  }
}
