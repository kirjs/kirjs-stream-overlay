import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  forkJoin,
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  switchMapTo,
  take,
  tap,
} from 'rxjs/operators';
import { CrudAdapter } from '../../../../crud/crud.module';
import { TokensService } from '../../../api-keys/tokens.service';
import { Subscription } from './subscriptions.module';

/**
 *
 * channel.channel_points_custom_reward_redemption.add
 * url
 * https://us-central1-kirjs-stream-overlay.cloudfunctions.net/twitch-hook
 * id
 * 2483096f-fe4c-499f-8924-8ddbf67893ac
 *
 */
@Injectable({
  providedIn: 'root',
})
export class TwitchSubscriptionAdapterService extends CrudAdapter<Subscription> {
  readonly clientId$ = this.tokenService.getToken('twitchRewardClientId');
  readonly secret$ = this.tokenService.getToken('twitchGeneratedSecret');
  readonly token$ = of('dgdaag3qyndfvfodvwxo84pdeu20os');
  readonly BASE_URL = 'https://api.twitch.tv/helix/eventsub/subscriptions';
  readonly fetchListSubject = new BehaviorSubject<void>(undefined);
  readonly broadcasterId = 86627424;

  readonly headers$ = combineLatest([this.clientId$, this.token$]).pipe(
    map(([clientId, token]) => {
      return new HttpHeaders()
        .set('client-id', clientId)
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json');
    }),
  );

  constructor(readonly http: HttpClient, readonly tokenService: TokensService) {
    super();
  }

  // https://us-central1-kirjs-stream-overlay.cloudfunctions.net/twitch-hook
  list(): Observable<Subscription[]> {
    return this.fetchListSubject.pipe(
      switchMapTo(this.headers$),
      switchMap(headers => {
        return this.http.get(this.BASE_URL, { headers });
      }),
      map((r: any) => r.data),
      map((a: any[]) =>
        a.map(i => {
          return {
            id: i.id,
            type: i.type,
            url: i.transport.callback,
          };
        }),
      ),
    );
  }

  create(s: Subscription): Observable<any> {
    const data$ = this.secret$.pipe(
      map(secret => {
        return {
          version: 1,
          type: s.type,
          condition: {
            broadcaster_user_id: this.broadcasterId.toString(),
          },
          transport: {
            method: 'webhook',
            callback: s.url,
            secret,
          },
        };
      }),
      take(1),
    );
    //  https://ac94-71-167-90-78.ngrok.io/kirjs-stream-overlay/us-central1/twitch-hook
    return forkJoin([data$, this.headers$.pipe(take(1))]).pipe(
      switchMap(([data, headers]) => {
        return this.http.post(this.BASE_URL, data, { headers });
      }),
      tap(r => {
        this.fetchListSubject.next();
      }),
    );
  }

  delete(subscription: Subscription): Observable<void> {
    return this.headers$.pipe(
      switchMap(headers => {
        return this.http.delete<void>(this.BASE_URL, {
          headers,
          params: { id: subscription.id },
        });
      }),
      tap(() => {
        this.fetchListSubject.next();
      }),
      catchError(a => {
        debugger;
        return EMPTY;
      }),
    );
  }

  update(t: any): Observable<any> {
    return of();
  }

  get(id: string): Observable<Subscription> {
    throw 'not implemented';
  }
}
