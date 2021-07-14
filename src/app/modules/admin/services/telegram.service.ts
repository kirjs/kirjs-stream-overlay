import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TokensService } from '../api-keys/tokens.service';
import { normalizeSpaces } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  constructor(
    private readonly tokenService: TokensService,
    private readonly http: HttpClient,
  ) {}

  postImage(file: Blob, caption: string): Observable<any> {
    return this.tokenService.getToken('telegramToken').pipe(
      take(1),
      switchMap(token => {
        const chatId = '-1001164093572';
        const url = `https://api.telegram.org/bot${token}/sendPhoto`;

        const data = new FormData();
        data.append('chat_id', chatId);
        data.append('caption', normalizeSpaces(caption));
        data.append('photo', file, 'lol.png');
        data.append('parse_mode', 'HTML');

        return this.http.post(url, data);
      }),
    );
  }
}
