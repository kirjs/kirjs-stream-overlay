import { ApiClient } from '@twurple/api';
import { EventSubChannelRedemptionAddEventData } from '@twurple/eventsub/lib/events/EventSubChannelRedemptionAddEvent';
import * as functions from 'firebase-functions';
import { verifyEventSubMessage } from './helpers/event_sub_helper';
import { broadcasterId, createApiClient } from './shared/shared';

const admin = require('firebase-admin');
admin.initializeApp({});
const db = admin.firestore();

async function getToken(id: string) {
  const val = await db.doc('config/tokens').get();

  return val.data().tokens.find((i: any) => i.name === id).value;
}

function logTheWinner(winner: string) {
  const d = db.doc('users/kirjs/plugins/rewards');
  return d.set({ winner });
}

const customRewardId = 'a97d4b41-8d8e-4fe0-b906-78398c6147c7';

class TwitchApiClient {
  constructor(readonly client: ApiClient) {}

  async createReward(): Promise<any> {
    return await this.client.channelPoints.createCustomReward(broadcasterId, {
      autoFulfill: true,
      backgroundColor: '#ffff00',
      cost: 100,
      globalCooldown: 10,
      isEnabled: true,
      maxRedemptionsPerStream: 0,
      maxRedemptionsPerUserPerStream: 0,
      prompt: 'Самое бесполезное вложение собак',
      title: 'Потратить собак ни на что',
      userInputRequired: false,
    });
  }

  async updateReward(cost: number, user: string): Promise<any> {
    console.log(cost, user);
    const newCost = user === 'kirjs' ? cost : cost + 10;

    return await this.client.channelPoints.updateCustomReward(
      broadcasterId,
      customRewardId,
      {
        title: '🐶' + user + ' будет низвергнут (beta)',
        globalCooldown: 15,
        cost: newCost,
      },
    );
  }

  async getReward(): Promise<any> {
    return await this.client.channelPoints.getCustomRewardById(
      broadcasterId,
      customRewardId,
    );
  }

  async getRewords(): Promise<any> {
    return await this.client.channelPoints.getCustomRewards(broadcasterId);
  }
}

const apiClient = createApiClient(
  'gp762nuuoqcoxypju8c569th9wz7q5',
  'kmhb63mh14rtotlr49jddtfevkkbfw',
  //await getToken('twitchRewardClientId'),
  //await getToken('twitchRewardToken'),
);

console.log('--');
/**
 * Will accept a callback from Twitch's EventSub system for Custom Reward Redemptions
 */
export const hook = functions.https.onRequest(async (req, res) => {
  if (req.method === 'POST') {
    console.log('HELLO I AM HOOK');
    const type = req.headers['Twitch-EventSub-Message-Type'.toLowerCase()];
    if (req.body.challenge) {
      if (
        type === 'webhook_callback_verification' &&
        verifyEventSubMessage(req.body, req.headers)
      ) {
        res.status(200).send(req.body.challenge);
      } else {
        console.log('403');
        res.status(403).send('403');
      }
    }
    // Actual Event Processing
    else {
      try {
        console.log('PROCESS');
        console.log(req.body);
        if (verifyEventSubMessage(req.body, req.headers)) {
          // Create data object from Body
          const data: EventSubChannelRedemptionAddEventData = req.body.event;

          // console.log('DO SOMETHING', data);

          const client = new TwitchApiClient(apiClient);

          const r = await client.getReward();

          logTheWinner(data.user_login);

          const update = await client.updateReward(r.cost, data.user_login);

          console.log(update);
          // No matter what, return status 200.
          res.status(200).send('OK');
        } else {
          res.status(403).send('forbidden');
        }
      } catch (e) {
        // If an API or DB call fails, return 500
        res.status(500).send('Something went wrong. Please try again.');
      }
    }
  } else {
    // If a GET request, 404 the webpage.
    res.status(404).send('404');
  }
});
