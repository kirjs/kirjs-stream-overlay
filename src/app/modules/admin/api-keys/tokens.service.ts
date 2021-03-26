import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, shareReplay, take, takeUntil, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Token {
  name: string;
  value: string;
}

interface Tokens {
  tokens: Token[];
}

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  private onDestroy = new Subject<void>();
  readonly tokens = this.angularFire.collection('config').doc<Tokens>('tokens');
  readonly tokens$: Observable<
    Token[] | undefined
  > = this.tokens.valueChanges().pipe(map(t => t?.tokens));

  constructor(private readonly angularFire: AngularFirestore) {}

  updateValue(callback: (t: Token[]) => Token[]): void {
    this.tokens$
      .pipe(
        take(1),
        map(tokens => tokens || []),
        map(callback),
        takeUntil(this.onDestroy),
      )
      .subscribe((tokens: Token[]) => {
        this.tokens.set({ tokens });
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
          throw new Error(`token ${name} is missing`);
        }
      }),
      take(1),
      shareReplay(1),
    );
  }
}
