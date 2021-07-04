import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, switchMap} from 'rxjs/operators';
import {forkJoin, Observable, throwError} from 'rxjs';
import {requireResteamAuth} from './restream.interceptor';

interface RestreamChannel {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestreamService {
  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getChannels(): Observable<RestreamChannel[]> {
    return this.http.get<RestreamChannel[]>(
      'https://api.restream.io/v2/user/channel/all',
      {
        context: requireResteamAuth(),
      });
  }

  updateChannelTitle(channelId: string, title: string) {
    return this.http.patch(
      'https://api.restream.io/v2/user/channel-meta/' + channelId,
      {title},
      {
        context: requireResteamAuth()
      }
    );
  }

  updateTitle(title: string) {
    return this.getChannels().pipe(
      switchMap(channels => {
        return forkJoin(channels.map(channel => {
          return this.updateChannelTitle(channel.id.toString(), title);
        }));
      }),
      catchError((error) => {
        return throwError({
          error: 'Restream error: ' + error.error.error.message
        });
      })
    );
  }
}
