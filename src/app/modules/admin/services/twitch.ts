import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Chat, Messages, PrivateMessage } from 'twitch-js';
import { ChatMessage } from '../../overlay/chat/types';
import { TokensService } from '../api-keys/tokens.service';
import { userId, username } from './tokens';

@Injectable({ providedIn: 'root' })
export class TwitchService {
  constructor(
    private readonly http: HttpClient,
    private readonly tokensService: TokensService,
  ) {}

  readonly twitchTokens$ = this.tokensService.getTokens(
    'twitchClientId',
    'twitchApiToken',
  );

  readonly timeout = 120000;
  readonly apiURL = 'https://api.twitch.tv/helix/';

  getCachedProfileUrl = () => {
    const imageUrlCache = new Map<string, string>();

    return switchMap((message: ChatMessage & { username: string }) => {
      const username = message.username;

      if (imageUrlCache.has(username)) {
        return of([
          {
            ...message,
            profileUrl: imageUrlCache.get(username),
          },
        ]);
      }

      return this.getUserProfileUrl(username).pipe(
        tap(profileUrl => imageUrlCache.set(username, profileUrl)),
        map(profileUrl => [
          {
            ...message,
            profileUrl,
          },
        ]),
      );
    });
  };

  readonly messages$: Observable<ChatMessage[]> = this.tokensService
    .getTokens('chatToken')
    .pipe(
      map(({ chatToken }) => {
        return new Chat({
          username,
          token: chatToken,
          log: { level: 'warn' },
        });
      }),
      chat$ => {
        return new Observable<PrivateMessage>(subscriber => {
          chat$.subscribe(async chat => {
            const commands = ['PRIVMSG'];

            chat.on('*', (message: Messages) => {
              if (commands.includes(message.command)) {
                subscriber.next(message as PrivateMessage);
              }
            });

            await chat.connect();
            await chat.join('kirjs');

            return () => {
              // I dedicate this unsubscribe to ichursin.
              chat.disconnect();
            };
          });
        });
      },
      map((message: PrivateMessage) => {
        return {
          text: message.message,
          displayName: message.tags.displayName,
          color: message.tags.color,
          timestamp: message.timestamp,
          username: message.username,
        };
      }),
      this.getCachedProfileUrl(),
    );

  getUserProfileUrl(username: string) {
    return this.twitchTokens$.pipe(
      take(1),
      switchMap(({ twitchClientId, twitchApiToken }) => {
        const params = new HttpParams().set('login', username);

        const headers = TwitchService.getHeaders(
          twitchClientId,
          twitchApiToken,
        );

        const objectObservable = this.http.get(this.apiURL + `users`, {
          headers,
          params,
        });

        return objectObservable.pipe(
          map((result: any) => {
            return result.data[0].profile_image_url;
          }),
        );
      }),
    );
  }

  updateStreamInfo(title: string, language = 'en'): Observable<void> {
    return this.twitchTokens$.pipe(
      take(1),
      switchMap(async ({ twitchClientId, twitchApiToken }) => {
        const params = new HttpParams().set(
          'broadcaster_id',
          userId.toString(),
        );

        const headers = TwitchService.getHeaders(
          twitchClientId,
          twitchApiToken,
        );
        const body = JSON.stringify({
          title,
          broadcaster_language: language,
        });

        await this.http
          .patch(this.apiURL + `channels`, body, {
            headers,
            params,
          })
          .toPromise();
      }),
    );
  }

  private static getHeaders(twitchClientId: string, twitchApiToken: string) {
    return new HttpHeaders()
      .set('client-id', twitchClientId)
      .set('Authorization', 'Bearer ' + twitchApiToken)
      .set('Content-Type', 'application/json');
  }
}
