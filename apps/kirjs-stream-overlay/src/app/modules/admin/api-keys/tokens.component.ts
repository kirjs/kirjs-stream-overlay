import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ADMIN_ACCESS_TOKEN_PARAM_NAME } from '../constants';
import { Token, TokensService } from './tokens.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-api-keys',
    templateUrl: './tokens.component.html',
    styleUrls: ['./tokens.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        ClipboardModule,
        AsyncPipe,
    ],
})
export class TokensComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  readonly ADMIN_ACCESS_TOKEN_PARAM_NAME = ADMIN_ACCESS_TOKEN_PARAM_NAME;

  readonly tokens$ = this.tokensService.tokens$;
  readonly adminAccessTokens$ = this.tokensService.adminAccessTokens$;

  constructor(private readonly tokensService: TokensService) {}

  updateToken(token: Token, value: string): void {
    this.tokensService.updateValue(tokens => {
      return tokens.map(t => (t.name !== token.name ? t : { ...t, value }));
    });
  }

  deleteToken(token: Token): void {
    this.tokensService.updateValue(tokens =>
      tokens.filter(t => t.name !== token.name),
    );
  }

  createToken(name: string): void {
    this.tokensService.updateValue(tokens => [...tokens, { name, value: '' }]);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  createAdminAccessToken() {
    this.tokensService.createAdminAccessToken();
  }

  deleteAdminAccessTokens$(id: string) {
    this.tokensService.deleteAdminAccessToken(id);
  }
}
