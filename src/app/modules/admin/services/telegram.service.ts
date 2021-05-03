import {Injectable} from '@angular/core';
import {TokensService} from '../api-keys/tokens.service';
import {HttpClient} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

function stripP(content: string): string {
  return content.replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '\r\n\r\n')
    .replace(/<br\s?\/?>/g, '\r\n')
    .replace(/&nbsp;/g, ' ');
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  constructor(
    private readonly tokenService: TokensService,
    private readonly http: HttpClient,
  ) {
  }

  postImage(file: Blob, caption: string): Observable<any> {
    return this.tokenService.getToken('telegramToken').pipe(switchMap((token) => {
      const chatId = '-1001164093572';
      const url = `https://api.telegram.org/bot${token}/sendPhoto`;

      const data = new FormData();
      data.append('chat_id', chatId);
      data.append('caption', stripP(caption));
      data.append('photo', file, 'lol.png');
      data.append('parse_mode', 'HTML');

      return this.http.post(url, data);
    }));
  }
}
