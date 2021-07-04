import {Injectable} from '@angular/core';
import {combineLatest, Observable, Subject} from 'rxjs';
import {map, take, takeUntil, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {nanoid} from 'nanoid';

export interface Token {
  name: string;
  value: string;
}

interface Tokens {
  tokens: Token[];
}

interface AdminAccessTokenPayload {
  enabled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  readonly tokens = this.angularFire.collection('config').doc<Tokens>('tokens');
  readonly tokens$: Observable<Token[] | undefined> = this.tokens.valueChanges().pipe(
    map(t => t?.tokens)
  );
  private onDestroy = new Subject<void>();
  private readonly adminAccessTokens = this.angularFire.collection('adminAccessTokens');
  readonly adminAccessTokens$ = this.adminAccessTokens.snapshotChanges().pipe(
    map(tokens => tokens.map(token => {
      return {
        id: token.payload.doc.id,
        enabled: (token.payload.doc.data() as AdminAccessTokenPayload).enabled
      };
    })));
  private readonly uidsWithAccessToTokens = this.angularFire.collection('uidsWithAccessToTokens');

  constructor(private readonly angularFire: AngularFirestore) {
  }

  elevateMeToAdminAndGrantMeTokens(uid: string, token: string) {
    return this.uidsWithAccessToTokens.doc(uid).set({token});
  }

  updateValue(callback: (t: Token[]) => Token[]): void {
    this.tokens$
      .pipe(
        take(1),
        map(tokens => tokens || []),
        map(callback),
        takeUntil(this.onDestroy),
      )
      .subscribe((tokens: Token[]) => {
        this.tokens.set({tokens});
      });
  }

  getTokens(...tokenNames: string[]) {
    return combineLatest(tokenNames.map(token => this.getToken(token))).pipe(
      map(tokens => {
        return tokens.reduce<Record<string, string>>((result, token, index) => {
          result[tokenNames[index]] = tokens[index];
          return result;
        }, {});
      }),
    );
  }

  getToken(name: string): Observable<string> {
    return this.tokens$.pipe(
      map((tokens: Token[] = []) => tokens.find(t => t.name === name)?.value!),
      tap(token => {
        if (!token) {
          console.error('Token does not exist: ' + name);
        }
      })
    );
  }

  createAdminAccessToken(): void {
    const id = nanoid();
    this.adminAccessTokens.doc(id).set({enabled: true});
  }

  deleteAdminAccessToken(id: string): Promise<void> {
    return this.adminAccessTokens.doc(id).delete();
  }
}
