import { getToken } from './tokens';

export const clientSecret = 'wnsrupckusxlbtvbq4s89xrygctrhr';
export const broadcasterId = 86627424;
export const customRewardId = 'b5f8169b-2114-4f85-ab95-6f357e3279d0';

let twitchGeneratedSecret: string;

export async function getTwitchGeneratedSecret() {
  if (twitchGeneratedSecret) {
    return twitchGeneratedSecret;
  }
  return (twitchGeneratedSecret = await getToken('twitchGeneratedSecret'));
}
