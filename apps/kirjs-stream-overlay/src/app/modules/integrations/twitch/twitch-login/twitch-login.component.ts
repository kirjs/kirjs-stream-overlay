import { Component, OnInit } from '@angular/core';
import { TokensService } from '../../../admin/api-keys/tokens.service';

// http://localhost:4200/admin/login/twitch/
@Component({
  selector: 'app-twitch-login',
  templateUrl: './twitch-login.component.html',
  styleUrl: './twitch-login.component.css',
})
export class TwitchLoginComponent implements OnInit {
  readonly scopes = 'channel:read:redemptions channel:manage:redemptions';
  readonly redirect = 'http://localhost:4200/admin/login/twitch/redirect';
  readonly clientId = '0w4e3rsat4gsmgzsh3d5p65s9g5qxi';

  constructor(readonly tokenService: TokensService) {}

  ngOnInit(): void {}
}
