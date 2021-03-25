import { Chat } from 'twitch-js';
import { Injectable } from '@angular/core';
import { combineLatest, interval, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { userId, username } from './tokens';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokensService } from './modules/admin/api-keys/tokens.service';

@Injectable({ providedIn: 'root' })
export class TwitchClient {
  constructor(
    private readonly http: HttpClient,
    private readonly tokensService: TokensService,
  ) {}

  readonly twitchTokens$ = this.tokensService.getTokens(
    'twitchClientId',
    'twitchApiToken',
  );

  readonly timeout = 120000;
  readonly now$ = interval(1000).pipe(map(() => Date.now()));

  readonly apiURL = 'https://api.twitch.tv/helix/';

  readonly messages$ = this.tokensService.getTokens('chatToken').pipe(
    map(({ chatToken }) => {
      return new Chat({
        username,
        token: chatToken,
        log: { level: 'warn' },
      });
    }),
    chat$ => {
      return new Observable<any[]>(subscriber => {
        const timeout = this.timeout;

        chat$.subscribe(async chat => {
          let messages: any[] = [];
          subscriber.next(messages);
          const commands = ['PRIVMSG'];
          chat.on('*', (message: any) => {
            if (commands.includes(message.command)) {
              messages.push(message);
              const now = Date.now();
              messages = messages.filter(m => now - m.timestamp < timeout);
              subscriber.next(messages);
            }
          });

          await chat.connect();
          await chat.join('kirjs');
        });
      });
    },
  );

  readonly chat$ = combineLatest([this.messages$, this.now$]).pipe(
    map(([messages, now]) => {
      return messages.filter(m => now - m.timestamp < this.timeout);
    }),
  );

  async updateStreamInfo(title: string, language = 'en'): Promise<void> {
    this.twitchTokens$
      .pipe(
        map(async ({ twitchClientId, twitchApiToken }) => {
          const params = new HttpParams().set(
            'broadcaster_id',
            userId.toString(),
          );

          const headers = new HttpHeaders()
            .set('client-id', twitchClientId)
            .set('Authorization', 'Bearer ' + twitchApiToken)
            .set('Content-Type', 'application/json');

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
        take(1),
      )
      .subscribe();
  }
}
