import { broadcasterId, clientId, secret } from './shared/shared';

export const twitch = require('./twitch');

const axios = require('axios');

async function subscribe() {
  // const response = await axios.post('https://id.twitch.tv/oauth2/token', {
  //   client_id: clientId,
  //   client_secret: clientSecret,
  //   grant_type: 'client_credentials',
  //   scope: 'channel:read:redemptions channel:manage:redemptions',
  // });
  // const token = response.data.access_token;
  const token = 'dgdaag3qyndfvfodvwxo84pdeu20os';
  console.log(token);

  const headers = {
    Authorization: 'Bearer ' + token,
    'Client-ID': clientId,
    'Content-Type': 'application/json',
  };

  const res = await axios.post(
    'https://api.twitch.tv/helix/eventsub/subscriptions',
    {
      version: 1,
      type: 'channel.channel_points_custom_reward_redemption.add',
      condition: {
        broadcaster_user_id: broadcasterId.toString(),
      },
      transport: {
        method: 'webhook',
        callback:
          'https://758b-71-167-90-78.ngrok.io/kirjs-stream-overlay/us-central1/twitch-hook',
        secret,
      },
    },
    { headers },
  );
}

subscribe();
