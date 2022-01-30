import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, interval, merge, Observable } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  scan,
  switchMap,
  switchMapTo,
} from 'rxjs/operators';
import { HighlightsService } from '../../admin/services/highlights.service';
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
    scan((messages: ChatMessage[], newMessages) => {
      const now = +new Date();

      messages.push(...newMessages);

      messages = messages.filter(
        m => now - Number(m.timestamp) < maxChatTimeout,
      );

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
    private readonly highlightsService: HighlightsService,
  ) {
    this.shouldPostToChat$
      .pipe(switchMapTo(this.highlightsService.highlights$), highlights => {
        let i = 0;
        return highlights.pipe(
          map((highlights: string[]) => {
            i = (i + 1) % highlights.length;
            return highlights[i];
          }),
        );
      })
      .subscribe((message: string) => {
        this.postMessage(message);
      });
  }

  readonly postToChat$ = interval(10 * 60 * 1000);

  private readonly shouldPostToChat$ = combineLatest([
    this.twitch.isStreamlive$,
    this.autoPostToChat$,
  ]).pipe(
    map(([isStreamlive, autoPostToChat]) => {
      return isStreamlive && autoPostToChat;
    }),
    distinctUntilChanged(),
    switchMap(postToChat => {
      return postToChat ? this.postToChat$ : EMPTY;
    }),
  );

  postMessage(message: string): void {
    return this.twitch.postMessage(message);
  }
}
