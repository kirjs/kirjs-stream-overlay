import { Injectable } from '@angular/core';
import { Auth, authState, signInAnonymously, user } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, first, mapTo, switchMap } from 'rxjs/operators';
import { TokensService } from '../api-keys/tokens.service';
import { ADMIN_ACCESS_TOKEN_PARAM_NAME } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AdminTokenAuthResolver implements Resolve<void> {
  constructor(
    private readonly auth: Auth,
    private readonly tokensService: TokensService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<void> {
    const adminAccessToken = route.queryParams[ADMIN_ACCESS_TOKEN_PARAM_NAME];
    if (adminAccessToken) {
      return authState(this.auth).pipe(
        switchMap(user => {
          if (user === null) {
            return from(signInAnonymously(this.auth)).pipe(mapTo(undefined));
          }
          return of(undefined);
        }),
        switchMap(() => {
          return this.tokensService.tokens$.pipe(
            mapTo(true),
            catchError(() => of(false)),
          );
        }),
        switchMap((hasAccess: boolean) => {
          if (!hasAccess) {
            return user(this.auth).pipe(
              switchMap(user => {
                return from(
                  this.tokensService.elevateMeToAdminAndGrantMeTokens(
                    user!.uid,
                    adminAccessToken,
                  ),
                );
              }),
              mapTo(undefined),
            );
          }
          return of(undefined);
        }),
        first(),
      );
    }
    return of(undefined);
  }
}
