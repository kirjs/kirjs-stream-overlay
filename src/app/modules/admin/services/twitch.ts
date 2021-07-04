import {Chat} from 'twitch-js';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {userId, username} from './tokens';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TokensService} from '../api-keys/tokens.service';
import {ChatMessage} from '../../overlay/chat/types';

@Injectable({providedIn: 'root'})
export class TwitchService {
  constructor(
    private readonly http: HttpClient,
    private readonly tokensService: TokensService,
  ) {
  }

  readonly twitchTokens$ = this.tokensService.getTokens(
    'twitchClientId',
    'twitchApiToken',
  );

  readonly timeout = 120000;


  readonly apiURL = 'https://api.twitch.tv/helix/';

  readonly messages$: Observable<ChatMessage[]> = this.tokensService.getTokens('chatToken').pipe(
    map(({chatToken}) => {
      return new Chat({
        username,
        token: chatToken,
        log: {level: 'warn'},
      });
    }),
    chat$ => {
      return new Observable<any[]>(subscriber => {
        chat$.subscribe(async chat => {
          const commands = ['PRIVMSG'];
          chat.on('*', (message: any) => {
            if (commands.includes(message.command)) {
              subscriber.next(message);
            }
          });

          await chat.connect();
          await chat.join('kirjs');
        });
      });
    },
    map((message: any) => {
      return [{
        text: message.message,
        author: message.tags.displayName,
        color: message.tags.color,
        timestamp: message.timestamp,
      }];
    })
  );

  updateStreamInfo(title: string, language = 'en'): Observable<void> {
    return this.twitchTokens$
      .pipe(
        take(1),
        switchMap(async ({twitchClientId, twitchApiToken}) => {
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
      );
  }
}
