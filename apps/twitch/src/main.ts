const crypto2 = require('crypto');
const express = require('express');
const app = express();
const port = 8080;

// Notification request headers
const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  'Twitch-Eventsub-Message-Signature'.toLowerCase();
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

// Prepend this string to the HMAC that's created from the message
const HMAC_PREFIX = 'sha256=';

app.use(
  express.raw({
    // Need raw message body for signature verification
    type: 'application/json',
  }),
);

app.post('/eventsub', (req: any, res: any) => {
  let secret = getSecret();
  let message = getHmacMessage(req);
  let hmac = HMAC_PREFIX + getHmac(secret, message); // Signature to compare

  if (verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE])) {
    console.log('signatures match');

    // Get JSON object from body, so you can process the message.
    let notification = JSON.parse(req.body);

    const messageType = req.headers[MESSAGE_TYPE];
    console.log('------');
    console.log(messageType);
    if (MESSAGE_TYPE_NOTIFICATION === messageType) {
      // TODO: Do something with the event's data.

      console.log(`Event type: ${notification.subscription.type}`);
      console.log(JSON.stringify(notification.event, null, 4));

      res.sendStatus(204);
    } else if (MESSAGE_TYPE_VERIFICATION === messageType) {
      res.status(200).send(notification.challenge);
    } else if (MESSAGE_TYPE_REVOCATION === messageType) {
      res.sendStatus(204);

      console.log(`${notification.subscription.type} notifications revoked!`);
      console.log(`reason: ${notification.subscription.status}`);
      console.log(
        `condition: ${JSON.stringify(
          notification.subscription.condition,
          null,
          4,
        )}`,
      );
    } else {
      res.sendStatus(204);
      console.log(`Unknown message type: ${messageType}`);
    }
  } else {
    console.log('403'); // Signatures didn't match.
    res.sendStatus(403);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function getSecret() {
  // TODO: Get secret from secure storage. This is the secret you pass
  // when you subscribed to the event.
  return 'pirojokpirojok';
}

// Build the message used to get the HMAC.
function getHmacMessage(request: any) {
  return (
    request.headers[TWITCH_MESSAGE_ID] +
    request.headers[TWITCH_MESSAGE_TIMESTAMP] +
    request.body
  );
}

// Get the HMAC.
function getHmac(secret: string, message: any) {
  return crypto2.createHmac('sha256', secret).update(message).digest('hex');
}

// Verify whether our hash matches the hash that Twitch passed in the header.
function verifyMessage(hmac: string, verifySignature: string) {
  return crypto2.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(verifySignature),
  );
}
