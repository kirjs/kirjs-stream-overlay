import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { requireResteamAuth } from './restream.interceptor';

interface RestreamChannel {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class RestreamService {
  constructor(private readonly http: HttpClient) {}

  getChannels(): Observable<RestreamChannel[]> {
    return this.http.get<RestreamChannel[]>(
      'https://api.restream.io/v2/user/channel/all',
      {
        context: requireResteamAuth(),
      },
    );
  }

  updateChannelTitle(channelId: string, title: string) {
    return this.http.patch(
      'https://api.restream.io/v2/user/channel-meta/' + channelId,
      { title },
      {
        context: requireResteamAuth(),
      },
    );
  }

  updateTitle(title: string) {
    return this.getChannels().pipe(
      switchMap(channels => {
        return forkJoin(
          channels.map(channel => {
            return this.updateChannelTitle(channel.id.toString(), title);
          }),
        );
      }),
      catchError(error => {
        // TODO(kirjs): Figure out why error messages have different format.
        const message = error.error.error
          ? error.error.error.message
          : error.message;
        return throwError({
          error: 'Restream error: ' + message,
        });
      }),
    );
  }
}
