import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokensService } from '../../admin/api-keys/tokens.service';

// this is needed for re-stream Oath redirect.
@Injectable({
  providedIn: 'root',
})
export class TwitchRedirectGuard implements CanActivate {
  constructor(readonly tokenService: TokensService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const accessToken = new URLSearchParams(route.fragment + '').get(
      'access_token',
    );

    if (accessToken !== null) {
      throw 'Not implenmented';
      this.tokenService.createToken('twitchUserOauthToken', accessToken!);
    }
    // return this.service.getRestreamToken(code).pipe(
    //   tap(() => window.close()),
    //   mapTo(true),
    // );

    debugger;
    return of(true);
  }
}
