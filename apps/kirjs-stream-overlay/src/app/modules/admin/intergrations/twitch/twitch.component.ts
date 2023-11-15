import { Component, OnInit } from '@angular/core';
import { TwitchIntegrationService } from './twitch-integration.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
    selector: 'app-twitch',
    templateUrl: './twitch.component.html',
    styleUrls: ['./twitch.component.css'],
    standalone: true,
    imports: [AsyncPipe, JsonPipe],
})
export class TwitchComponent implements OnInit {
  readonly subscriptions$ = this.twitchIntegrationService.listSubscriptions();
  constructor(readonly twitchIntegrationService: TwitchIntegrationService) {}

  ngOnInit(): void {}
}
