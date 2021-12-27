import {
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { TokensService } from '../../admin/api-keys/tokens.service';
import { RestreamAuthService } from './restream-auth.service';

const RESTREAM_REQUIRES_AUTH = new HttpContextToken<boolean>(() => false);

export function requireResteamAuth() {
  return new HttpContext().set(RESTREAM_REQUIRES_AUTH, true);
}

@Injectable()
export class RestreamInterceptor implements HttpInterceptor {
  // TODO(kirjs): Handle multiple simultaneous requests.
  private headers$ = this.restreamAuth.token$.pipe(
    switchMap(token => {
      if (!token) {
        return this.restreamAuth.handleTokenMissingError();
      }
      return of(token);
    }),
    map(token => {
      return { Authorization: 'Bearer ' + token };
    }),
  );

  constructor(
    private readonly tokensService: TokensService,
    private readonly snackBar: MatSnackBar,
    private readonly restreamAuth: RestreamAuthService,
  ) {}

  addTokenToHeaders(req: HttpRequest<any>): Observable<HttpRequest<any>> {
    return this.headers$.pipe(
      take(1),
      map(headers => {
        return req.clone({ setHeaders: { ...headers } });
      }),
    );
  }

  makeRequest(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.addTokenToHeaders(request).pipe(
      switchMap(req => {
        return next.handle(req);
      }),
    );
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const handleError = (error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        return this.restreamAuth.refreshToken().pipe(
          // TODO(kirjs): make request
          switchMap(() => this.addTokenToHeaders(request)),
          switchMap(req => next.handle(req)),
        );
      }

      return throwError(error);
    };

    if (request.context.get(RESTREAM_REQUIRES_AUTH)) {
      return this.makeRequest(request, next).pipe(catchError(handleError));
    }
    return next.handle(request);
  }
}
