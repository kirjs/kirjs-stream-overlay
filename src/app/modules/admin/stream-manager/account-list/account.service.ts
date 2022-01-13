import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserAccount } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly #accounts = collection(
    this.firestore,
    'users/kirjs/admins',
  ) as CollectionReference<UserAccount>;
  readonly accounts$ = collectionData(this.#accounts);

  readonly isAdmin$ = user(this.auth).pipe(
    switchMap(user => {
      if (!user) {
        return of(false);
      }
      return getDoc(doc(this.#accounts, user.uid)).then(
        d => d.data()?.isAdmin || false,
      );
    }),
  );

  constructor(private readonly firestore: Firestore, public auth: Auth) {}

  addAccount(accountId: string): void {
    user(this.auth)
      .pipe(take(1))
      .subscribe(async user => {
        if (!user) {
          return;
        }
        const account = {
          id: accountId,
        };
        await setDoc(doc(this.#accounts, accountId), account);

        await setDoc(doc(this.#accounts, accountId, 'admins', user!.uid), {
          isAdmin: true,
        } as unknown as UserAccount);
      });
  }
}
