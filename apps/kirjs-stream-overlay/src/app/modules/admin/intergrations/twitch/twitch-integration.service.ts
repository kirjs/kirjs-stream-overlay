import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TokensService } from '../../api-keys/tokens.service';

// async function _subscribe(): Promise<string> {
//   const token = 'dgdaag3qyndfvfodvwxo84pdeu20os';
//   console.log(token);
//
//   const clientId = await getToken('twitchRewardClientId');
//   const secret = await getToken('twitchGeneratedSecret');
//   const headers = {
//     Authorization: 'Bearer ' + token,
//     'Client-ID': clientId,
//     'Content-Type': 'application/json',
//   };
//
//   const result = await axios.post(
//     'https://api.twitch.tv/helix/eventsub/subscriptions',
//     {
//       version: 1,
//       type: 'channel.channel_points_custom_reward_redemption.add',
//       condition: {
//         broadcaster_user_id: broadcasterId.toString(),
//       },
//       transport: {
//         method: 'webhook',
//         callback:
//           'https://us-central1-kirjs-stream-overlay.cloudfunctions.net/twitch-hook',
//         secret,
//       },
//     },
//     { headers },
//   );
//
//   return result.data;
// }
//
// async function fetchToken(): Promise<string> {
//   const clientId = await getToken('twitchRewardClientId');
//
//   const clientSecret = await getToken('twitchSecret');
//   const response = await axios.post('https://id.twitch.tv/oauth2/token', {
//     client_id: clientId,
//     client_secret: clientSecret,
//     grant_type: 'client_credentials',
//     scope: 'channel:read:redemptions channel:manage:redemptions',
//   });
//   const token = response.data.access_token;
//   return token;
// }
//
// const actions: Record<string, () => Promise<any>> = {
//   subscribe: _subscribe,
//   unsubscribe,
//   fetchToken,
// };
//
// export const subscribe = functions.https.onRequest(
//   async (req, res): Promise<any> => {
//     const actionName = (req.query.action || 'subscribe') as string;
//
//     if (!actions.hasOwnProperty(actionName)) {
//       res.status(404).send('Action not found:' + actionName);
//       return;
//     }
//
//     try {
//       const result = await actions[actionName]();
//       res.status(200).send(actionName + ': ' + JSON.stringify(result));
//     } catch (e) {
//       return res.status(500).send(e);
//     }
//   },
// );

@Injectable({
  providedIn: 'root',
})
export class TwitchIntegrationService {
  readonly clientId$ = this.tokenService.getToken('twitchRewardClientId');
  readonly token$ = of('dgdaag3qyndfvfodvwxo84pdeu20os');
  readonly BASE_URL = 'https://api.twitch.tv/helix/eventsub/subscriptions';

  readonly headers$ = combineLatest([this.clientId$, this.token$]).pipe(
    map(([clientId, token]) => {
      return new HttpHeaders()
        .set('client-id', clientId)
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json');
    }),
  );

  constructor(
    readonly http: HttpClient,
    readonly tokenService: TokensService,
  ) {}

  // https://us-central1-kirjs-stream-overlay.cloudfunctions.net/twitch-hook
  listSubscriptions(): Observable<any> {
    return this.headers$.pipe(
      switchMap(headers => {
        return this.http.get(
          'https://api.twitch.tv/helix/eventsub/subscriptions',
          { headers },
        );
      }),
    );
  }

  // async unsubscribeAll(): Promise<any[]> {
  //   const subscribes = await axios.get(
  //     'https://api.twitch.tv/helix/eventsub/subscriptions',
  //     {
  //       headers,
  //     },
  //   );
  //
  //   const ids = subscribes.data.data.map((d: any) => d.id);
  //   console.log('unsub', ids);
  //
  //   const unsubs = ids.map((id: string) => {
  //     return axios
  //       .delete(`https://api.twitch.tv/helix/eventsub/subscriptions?id=${id}`, {
  //         headers,
  //       })
  //       .then((a: any) => a);
  //   });
  //
  //   return Promise.all(unsubs);
  // }
}
