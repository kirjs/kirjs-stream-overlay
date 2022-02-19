// import { ApiClient } from '@twurple/api';
// import { StaticAuthProvider } from '@twurple/auth';
// import { clientSecret } from './shared/shared';
// import { TwitchApiClient } from './shared/twitch-client';
//
// function createApiClient(clientId: string, clientSecret: string): ApiClient {
//   console.log(clientId, clientSecret);
//   const clientCredentialsAuthProvider = new StaticAuthProvider(
//     clientId,
//     '34346wyy7aup3tk000ou3tjsyh1i2u',
//     ['channel:read:redemptions', 'channel:manage:redemptions'],
//   );
//
//   const apiClient = new ApiClient({
//     authProvider: clientCredentialsAuthProvider,
//   });
//
//   return apiClient;
// }
//
// async function lol() {
//   const api = new TwitchApiClient(createApiClient(clientId, clientSecret));
//   const rewards = await api.getRewards();
//   debugger;
//   console.log(rewards.map((a: any) => ({ id: a.id, title: a.title })));
// }
//
// lol();
