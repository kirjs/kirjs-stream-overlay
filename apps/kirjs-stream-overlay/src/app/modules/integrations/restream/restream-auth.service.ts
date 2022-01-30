import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { TokensService } from '../../admin/api-keys/tokens.service';
import { requireResteamAuth } from './restream.interceptor';

@Injectable({
  providedIn: 'root',
})
export class RestreamAuthService {
  private readonly clientId = '8c1022e9-5b6d-42e9-b685-8b8994f71981';
  private readonly redirectUri = 'http://localhost:4200/admin/login/restream';
  private readonly refreshToken$ = this.tokensService.getToken(
    'restreamRefreshToken',
  );

  token$ = this.tokensService.getToken('restreamAccessToken');

  getAuthHref() {
    return `https://api.restream.io/login?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=lol`;
  }

  handleTokenMissingError() {
    // TODO(kirjs): Test this
    const snackBar = this.snackBar.open('Waiting for restream token', 'cancel');

    const cancel$ = snackBar.onAction();

    this.login();

    return this.token$.pipe(
      takeUntil(cancel$),
      tap(() => snackBar.dismiss()),
      filter(a => !!a),
    );
  }

  getRestreamToken(code: string) {
    return this.http.post(
      `http://localhost:5001/kirjs-stream-overlay/us-central1/getRestreamToken`,
      {
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        code,
      },
    );
  }

  login() {
    window.open(this.getAuthHref());
  }

  refreshToken() {
    return this.refreshToken$.pipe(
      take(1),
      switchMap(refreshToken => {
        // TODO(kirjs): Use full url
        return this.http.post(
          `http://localhost:5001/kirjs-stream-overlay/us-central1/getRestreamToken`,
          {
            client_id: this.clientId,
            refresh_token: refreshToken,
          },
          {
            context: requireResteamAuth(),
          },
        );
      }),
    );
  }

  constructor(
    private readonly tokensService: TokensService,
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
  ) {}
}
