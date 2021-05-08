import {Injectable} from '@angular/core';
import {TokensService} from '../api-keys/tokens.service';
import {HttpClient} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {normalizeSpaces} from "../utils";

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
      data.append('caption', normalizeSpaces(caption));
      data.append('photo', file, 'lol.png');
      data.append('parse_mode', 'HTML');

      return this.http.post(url, data);
    }));
  }
}
