import { Component, OnInit } from '@angular/core';
import { TwitchIntegrationService } from './twitch-integration.service';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css'],
})
export class TwitchComponent implements OnInit {
  readonly subscriptions$ = this.twitchIntegrationService.listSubscriptions();
  constructor(readonly twitchIntegrationService: TwitchIntegrationService) {}

  ngOnInit(): void {}
}
