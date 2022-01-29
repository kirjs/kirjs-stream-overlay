import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TokensService } from '../api-keys/tokens.service';

export interface TelegramChannel {
  name: string;
  chatId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  constructor(
    private readonly tokenService: TokensService,
    private readonly http: HttpClient,
  ) {}

  public readonly channels$: Observable<TelegramChannel[]> = of([
    {
      name: 'preview',
      chatId: '-1001164093572',
    },

    {
      name: 'main',
      chatId: '-1001371444473',
    },
  ]);

  postImage(file: Blob, caption: string, chatId: string): Observable<any> {
    return this.tokenService.getToken('telegramToken').pipe(
      take(1),
      switchMap(token => {
        const url = `https://api.telegram.org/bot${token}/sendPhoto`;

        const data = new FormData();
        data.append('chat_id', chatId);
        data.append('caption', caption);
        data.append('photo', file, 'lol.png');
        data.append('parse_mode', 'MarkdownV2');

        return this.http.post(url, data);
      }),
    );
  }
}
