import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  CrudConfig,
  CrudModule,
  DisplayMode,
  Mode,
} from '../../../../crud/crud.module';
import { TwitchSubscriptionAdapterService } from './twitch-subscription-adapter.service';

export interface Subscription {
  id: string;
  url: string;
  type: string;
}

const config: CrudConfig = {
  name: 'guest',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      values: [
        'channel.channel_points_custom_reward_redemption.add',
        'channel.follow',
      ],
      defaultValue: 'channel.channel_points_custom_reward_redemption.add',
      validators: [Validators.required],
    },
    {
      name: 'url',
      label: 'Url',
      type: 'input',
      defaultValue:
        'https://us-central1-kirjs-stream-overlay.cloudfunctions.net/twitch-hook',
    },
    {
      name: 'id',
      label: 'Id',
      type: 'textarea',
      display: { [Mode.CREATE]: DisplayMode.HIDDEN },
    },
  ],
  adapter: TwitchSubscriptionAdapterService,
};

@NgModule({
  imports: [CommonModule, CrudModule.forConfig(config)],
})
export class SubscriptionsModule {}
