import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { UserAccount } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly #accounts = collection(
    this.firestore,
    'accounts',
  ) as CollectionReference<UserAccount>;
  readonly accounts$ = collectionData(this.#accounts);

  constructor(private readonly firestore: Firestore, public auth: Auth) {}

  addAccount(accountId: string): void {
    user(this.auth)
      .pipe(take(1))
      .subscribe(async user => {
        const account = {
          id: accountId,
        };
        await setDoc(doc(this.#accounts, accountId), account);

        await setDoc(doc(this.#accounts, accountId, 'admins', user!.uid), ({
          isAdmin: true,
        } as unknown) as UserAccount);
      });
  }
}
