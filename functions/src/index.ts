import * as functions from "firebase-functions";
import fetch from 'node-fetch';

const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp();

export interface Token {
  name: string;
  value: string;
}

interface RefreshTokenParams {
  grant_type: string;
  refresh_token: string;
  client_id: string;
  client_secret: string;
}

interface GetTokenParams {
  code: any;
  grant_type: string;
  redirect_uri: string;
  client_secret: string;
  client_id: string
}

const tokensDoc = admin.firestore().collection('config')
  .doc('tokens');

async function getTokens() {
  return (await tokensDoc.get()).data().tokens;
}

async function getSecret() {
  return (await getTokens()).find((t: any) => t.name === 'restreamSecret').value;
}

function addToken(tokens: Token[], name: string, value: string): Token[] {
  return tokens.filter(token => token.name !== name).concat({name, value});
}

async function updateTokens(accessToken: string, refreshToken: string) {
  const tokens = addToken(
    addToken(await getTokens(), 'restreamAccessToken', accessToken),
    'restreamRefreshToken', refreshToken
  );

  return tokensDoc.set({tokens});
}

async function getToken(body: any, client_secret: string) {
  const params = {
    code: body.code,
    grant_type: 'authorization_code',
    redirect_uri: body.redirect_uri,
    client_id: body.client_id,
    client_secret,
  }
  return await makeRequest(params);
}

async function refreshToken(body: any, client_secret: string) {
  const params = {
    grant_type: 'refresh_token',
    refresh_token: body.refresh_token,
    client_id: body.client_id,
    client_secret,
  }

  return await makeRequest(params);
}


async function makeRequest(params: RefreshTokenParams | GetTokenParams) {
  const headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};

  const data = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    data.append(key, value);
  }

  return await fetch('https://api.restream.io/oauth/token', {
    method: 'POST',
    body: data,
    headers
  });
}

export const getRestreamToken = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const body = request.body;

    const client_secret = await getSecret();
    const result = await (body.refresh_token ?
        refreshToken(body, client_secret) :
        getToken(body, client_secret)
    );

    const json = await result.json();

    if (result.ok) {
      await updateTokens(json.accessToken, json.refreshToken);
      response.send('{"status": 200, "ok": true}');
    } else {
      const message = `error [${json.error.name}]: ${json.error.message}`;
      response.status(result.status);
      response.send(message);
    }
  });
});
