import * as functions from 'firebase-functions';
import { broadcasterId } from './shared/shared';
import { getToken } from './shared/tokens';

export const twitch = require('./twitch');

const axios = require('axios');

async function _subscribe(): Promise<string> {
  const token = 'dgdaag3qyndfvfodvwxo84pdeu20os';
  console.log(token);

  const clientId = await getToken('twitchRewardClientId');
  const secret = await getToken('twitchGeneratedSecret');
  const headers = {
    Authorization: 'Bearer ' + token,
    'Client-ID': clientId,
    'Content-Type': 'application/json',
  };

  const result = await axios.post(
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
          'https://ac94-71-167-90-78.ngrok.io/kirjs-stream-overlay/us-central1/twitch-hook',
        secret,
      },
    },
    { headers },
  );

  return result.data;
}

async function fetchToken() {
  const clientId = await getToken('twitchRewardClientId');

  const clientSecret = await getToken('twitchSecret');
  const response = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
    scope: 'channel:read:redemptions channel:manage:redemptions',
  });
  const token = response.data.access_token;
  return token;
}

async function unsubscribe(): Promise<any[]> {
  const clientId = await getToken('twitchRewardClientId');
  const token = 'dgdaag3qyndfvfodvwxo84pdeu20os';

  const headers = {
    Authorization: 'Bearer ' + token,
    'Client-ID': clientId,
    'Content-Type': 'application/json',
  };

  const subscribes = await axios.get(
    'https://api.twitch.tv/helix/eventsub/subscriptions',
    {
      headers,
    },
  );

  const ids = subscribes.data.data.map((d: any) => d.id);
  console.log('unsub', ids);

  const unsubs = ids.map((id: string) => {
    return axios
      .delete(`https://api.twitch.tv/helix/eventsub/subscriptions?id=${id}`, {
        headers,
      })
      .then((a: any) => a);
  });

  return Promise.all(unsubs);
}

const actions: Record<string, () => Promise<any>> = {
  subscribe: _subscribe,
  unsubscribe,
  fetchToken,
};

export const subscribe = functions.https.onRequest(
  async (req, res): Promise<any> => {
    const actionName = (req.query.action || 'subscribe') as string;

    if (!actions.hasOwnProperty(actionName)) {
      res.status(404).send('Action not found:' + actionName);
      return;
    }

    try {
      const result = await actions[actionName]();
      res.status(200).send(actionName + ': ' + JSON.stringify(result));
    } catch (e) {
      return res.status(500).send(e);
    }
  },
);
