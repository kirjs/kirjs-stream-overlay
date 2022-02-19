import { getTwitchGeneratedSecret } from '../shared/shared';

const crypto = require('crypto');

/**
 * Will take req.body and req.headers from the eventsub webhook post request, and verifyWebhookMessage the signature.
 */
export const verifyEventSubMessage = async (body: any, headers: any) => {
  return (
    headers['Twitch-EventSub-Message-Signature'.toLowerCase()] ===
    (await createSignature(body, headers))
  );
};

/**
 * Creates the sha256 signature from req.body and req.headers
 * @param body
 * @param headers
 */
const createSignature = async (body: any, headers: any) => {
  const eventSubSecret = await getTwitchGeneratedSecret();
  const hmacMessage =
    headers['Twitch-EventSub-Message-Id'.toLowerCase()] +
    headers['Twitch-EventSub-Message-Timestamp'.toLowerCase()] +
    JSON.stringify(body);
  const signature = crypto
    .createHmac('sha256', eventSubSecret)
    .update(hmacMessage)
    .digest('hex');
  return 'sha256=' + signature;
};
