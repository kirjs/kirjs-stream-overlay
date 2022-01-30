const crypto = require('crypto');
/**
 * Set this between 10 and 100 characters. This will be the eventsubSecret the webhook header uses to create the signed signature.
 */
export const eventSubSecret = 'pirojokpirojok';

/**
 * Will take req.body and req.headers from the eventsub webhook post request, and verifyWebhookMessage the signature.
 */
export const verifyEventSubMessage = (body: any, headers: any) => {
  return (
    headers['Twitch-EventSub-Message-Signature'.toLowerCase()] ===
    createSignature(body, headers)
  );
};

/**
 * Creates the sha256 signature from req.body and req.headers
 * @param body
 * @param headers
 */
const createSignature = (body: any, headers: any) => {
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
