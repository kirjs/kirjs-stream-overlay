import { Api, Chat } from 'twitch-js';
import { Injectable } from '@angular/core';
import { combineLatest, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiToken, clientId, token, userId, username } from './tokens';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TwitchClient {
  constructor(private readonly http: HttpClient) {}

  readonly timeout = 120000;
  readonly token = token;
  readonly now$ = interval(1000).pipe(map(() => Date.now()));

  readonly api = new Api({
    token: ApiToken,
    clientId,
    log: { level: 'warn' },
  });

  readonly apiURL = 'https://api.twitch.tv/helix/';

  // TODO(kirjs): Get the latest follower.
  readonly api$ = new Observable<any[]>(subscriber => {
    async function start(): Promise<void> {
      // const follows = await this.api.get(`users/follows`, {
      //   search: { to_id: userId, limit: 3 },
      // });
    }

    start();
  }).subscribe();

  readonly messages$ = new Observable<any[]>(subscriber => {
    const timeout = this.timeout;

    async function start(): Promise<void> {
      const chat = new Chat({
        username,
        token,
        log: { level: 'warn' },
      });

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
    }

    start();
  });

  readonly chat$ = combineLatest([this.messages$, this.now$]).pipe(
    map(([messages, now]) => {
      return messages.filter(m => now - m.timestamp < this.timeout);
    }),
  );

  async updateStreamInfo(title: string, language = 'en'): Promise<void> {
    const params = new HttpParams().set('broadcaster_id', userId.toString());

    const headers = new HttpHeaders()
      .set('client-id', clientId)
      .set('Authorization', 'Bearer ' + ApiToken)
      .set('Content-Type', 'application/json');

    const body = JSON.stringify({ title, broadcaster_language: language });
    const result = await this.http
      .patch(this.apiURL + `channels`, body, {
        headers,
        params,
      })
      .toPromise();
  }
}
