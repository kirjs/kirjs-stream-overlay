import { Injectable } from '@angular/core';
import {
  collection,
  collectionSnapshots,
  deleteDoc,
  doc,
  docData,
  Firestore,
  QueryDocumentSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { nanoid } from 'nanoid';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';

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

interface AdminAccessTokenPayloadWithId extends AdminAccessTokenPayload {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  readonly tokens = doc(this.firestore, 'config/tokens'); // <Tokens>
  readonly tokens$: Observable<Token[] | undefined> = docData(this.tokens).pipe(
    map(t => t?.tokens),
  );

  private onDestroy = new Subject<void>();
  private readonly adminAccessTokens = collection(
    this.firestore,
    'adminAccessTokens',
  ).withConverter({
    toFirestore(config: AdminAccessTokenPayload) {
      return config;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
    ): AdminAccessTokenPayloadWithId {
      return {
        enabled: snapshot.get('enabled'),
        id: snapshot.id,
      };
    },
  });

  readonly adminAccessTokens$ = collectionSnapshots(this.adminAccessTokens);

  private readonly uidsWithAccessToTokens = collection(
    this.firestore,
    'uidsWithAccessToTokens',
  );

  constructor(private readonly firestore: Firestore) {}

  elevateMeToAdminAndGrantMeTokens(uid: string, token: string) {
    const ref = doc(this.uidsWithAccessToTokens, uid);
    return setDoc(ref, { token });
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
        setDoc(this.tokens, { tokens });
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

  updateToken(name: string, value: string): void {
    return this.updateValue(tokens => {
      return tokens.map(t => (t.name !== name ? t : { ...t, value }));
    });
  }

  createToken(name: string, value: string): void {
    this.updateValue(tokens => [...tokens, { name, value }]);
  }

  getToken(name: string): Observable<string> {
    return this.tokens$.pipe(
      map((tokens: Token[] = []) => tokens.find(t => t.name === name)?.value!),
      tap(token => {
        if (!token) {
          console.error('Token does not exist: ' + name);
        }
      }),
    );
  }

  async createAdminAccessToken(): Promise<void> {
    // TODO(kirjs): await
    const id = nanoid();
    await setDoc(doc(this.adminAccessTokens, id), { enabled: true });
  }

  deleteAdminAccessToken(id: string): Promise<void> {
    return deleteDoc(doc(this.adminAccessTokens, id));
  }
}
