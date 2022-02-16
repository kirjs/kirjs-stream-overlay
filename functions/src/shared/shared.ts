import { ApiClient } from '@twurple/api';
import { StaticAuthProvider } from '@twurple/auth';

export const clientId = '0w4e3rsat4gsmgzsh3d5p65s9g5qxi';
export const clientSecret = 'wnsrupckusxlbtvbq4s89xrygctrhr';
export const broadcasterId = 86627424;
export const secret = 'pirojokpirojok';

export function createApiClient(clientId: string, clientSecret: string) {
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
