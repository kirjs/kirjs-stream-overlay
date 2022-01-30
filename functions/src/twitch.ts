import { ApiClient } from '@twurple/api';
import { StaticAuthProvider } from '@twurple/auth';
import { EventSubChannelRedemptionAddEventData } from '@twurple/eventsub/lib/Events/EventSubChannelRedemptionAddEvent';
import * as functions from 'firebase-functions';
import { verifyEventSubMessage } from './helpers/event_sub_helper';

const broadcasterId = 86627424;
const admin = require('firebase-admin');
admin.initializeApp({});
const db = admin.firestore();

const title = 'Потратить собак ни на что';

async function createApiClient() {
  const val = await db.doc('config/tokens').get();

  const clientId = val
    .data()
    .tokens.find((i: any) => i.name === 'twitchRewardClientId').value;
  const apiToken = val
    .data()
    .tokens.find((i: any) => i.name === 'twitchRewardToken').value;

  return new ApiClient({
    authProvider: new StaticAuthProvider(clientId, apiToken),
  });
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
      title,
      userInputRequired: false,
    });
  }

  async updateReward(cost: number): Promise<any> {
    return await this.client.channelPoints.updateCustomReward(
      broadcasterId,
      customRewardId,
      {
        cost: cost + 10,
      },
    );
  }

  async getReword(): Promise<any> {
    return await this.client.channelPoints.getCustomRewardById(
      broadcasterId,
      customRewardId,
    );
  }

  async getRewords(): Promise<any> {
    return await this.client.channelPoints.getCustomRewards(broadcasterId);
  }
}

/**
 * Will accept a callback from Twitch's EventSub system for Custom Reward Redemptions
 */
export const eventSubCustomRedemptionCallback = functions.https.onRequest(
  async (req, res) => {
    if (req.method === 'POST') {
      const type = req.headers['Twitch-EventSub-Message-Type'.toLowerCase()];
      if (req.body.challenge) {
        if (
          type === 'webhook_callback_verification' &&
          verifyEventSubMessage(req.body, req.headers)
        ) {
          res.status(200).send(req.body.challenge);
        } else {
          res.status(403).send('403');
        }
      }
      // Actual Event Processing
      else {
        try {
          if (verifyEventSubMessage(req.body, req.headers)) {
            // Create data object from Body
            const eventSubChannelRedemptionAddEventData: EventSubChannelRedemptionAddEventData =
              req.body.event;

            console.log('DO SOMETHING', eventSubChannelRedemptionAddEventData);

            const client = new TwitchApiClient(await createApiClient());
            const r = await client.getReword();
            await logTheWinner(
              eventSubChannelRedemptionAddEventData.user_login,
            );
            client.updateReward(r.cost);
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
  },
);
