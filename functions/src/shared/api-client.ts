import { ApiClient } from '@twurple/api';
import { StaticAuthProvider } from '@twurple/auth';
import { getToken } from './tokens';

let apiClient: ApiClient;

function createApiClient(clientId: string, clientSecret: string): ApiClient {
  const clientCredentialsAuthProvider = new StaticAuthProvider(
    clientId,
    clientSecret,
    ['channel:read:redemptions', 'channel:manage:redemptions'],
  );

  const apiClient = new ApiClient({
    authProvider: clientCredentialsAuthProvider,
  });

  return apiClient;
}

export async function getApiClient(): Promise<ApiClient> {
  if (apiClient) {
    return apiClient;
  }

  return (apiClient = createApiClient(
    await getToken('twitchRewardClientId'),
    await getToken('twitchUserOauthToken'),
  ));
}
