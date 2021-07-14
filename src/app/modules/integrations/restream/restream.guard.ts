import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { RestreamAuthService } from './restream-auth.service';

// this is needed for re-stream Oath redirect.
@Injectable({
  providedIn: 'root',
})
export class RestreamGuard implements CanActivate {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly service: RestreamAuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    const code: string = route.queryParams.code;

    if (!code) {
      this.snackBar.open('Error! No code!!');
    }

    return this.service.getRestreamToken(code).pipe(
      tap(() => window.close()),
      mapTo(true),
    );
  }
}
