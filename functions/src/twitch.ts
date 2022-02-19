import { EventSubChannelRedemptionAddEventData } from '@twurple/eventsub/lib/events/EventSubChannelRedemptionAddEvent';
import * as functions from 'firebase-functions';
import { verifyEventSubMessage } from './helpers/event_sub_helper';
import { getApiClient } from './shared/api-client';
import { firestore } from './shared/firestore';
import { TwitchApiClient } from './shared/twitch-client';

function logTheWinner(winner: string): Promise<any> {
  const d = firestore.doc('users/kirjs/plugins/rewards');
  return d.set({ winner });
}

console.log('--');
/**
 * Will accept a callback from Twitch's EventSub system for Custom Reward Redemptions
 */
export const hook = functions.https.onRequest(async (req, res) => {
  const apiClient = await getApiClient();
  if (req.method === 'POST') {
    console.log('HELLO I AM HOOK');
    const type = req.headers['Twitch-EventSub-Message-Type'.toLowerCase()];
    console.log(type);
    if (req.body.challenge) {
      if (
        type === 'webhook_callback_verification' &&
        (await verifyEventSubMessage(req.body, req.headers))
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
        console.log('*');
        if (await verifyEventSubMessage(req.body, req.headers)) {
          console.log('verified');
          // Create data object from Body
          const data: EventSubChannelRedemptionAddEventData = req.body.event;

          const client = new TwitchApiClient(apiClient);
          console.log('b');
          const r = await client.getReward();
          console.log('c');
          logTheWinner(data.user_login);
          console.log('d');
          // await client.createReward();
          const update = await client.updateReward(r.cost, data.user_login);

          console.log('update');
          // No matter what, return status 200.
          res.status(200).send('OK');
        } else {
          console.log('forbidden');
          res.status(403).send('forbidden');
        }
      } catch (e) {
        // If an API or DB call fails, return 500
        console.log('500', e);
        res.status(500).send('Something went wrong. Please try again.');
      }
    }
  } else {
    // If a GET request, 404 the webpage.
    res.status(404).send('Hi, you are not twitch');
  }
});
