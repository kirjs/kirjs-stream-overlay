import { ApiClient } from '@twurple/api';
import { broadcasterId, customRewardId } from './shared';

export class TwitchApiClient {
  constructor(readonly client: ApiClient) {}

  async createReward(): Promise<any> {
    return await this.client.channelPoints.createCustomReward(broadcasterId, {
      autoFulfill: true,
      backgroundColor: '#ffff00',
      cost: 882,
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
    const newCost = user === 'kirjs' ? cost - 1 : cost + 10;

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

  async getRewards(): Promise<any> {
    return await this.client.channelPoints.getCustomRewards(broadcasterId);
  }
}
