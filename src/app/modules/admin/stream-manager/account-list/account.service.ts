import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { UserAccount } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly #accounts = this.firestore.collection<UserAccount>('accounts');
  readonly accounts$ = this.#accounts.valueChanges();

  constructor(
    private readonly firestore: AngularFirestore,
    public auth: AngularFireAuth,
  ) {}

  addAccount(accountId: string): void {
    this.auth.user.pipe(take(1)).subscribe(async user => {
      const account = {
        id: accountId,
      };
      await this.#accounts.doc(accountId).set(account);
      await this.#accounts
        .doc(accountId)
        .collection('admins')
        // tslint:disable-next-line:no-non-null-assertion
        .doc(user!.uid)
        .set({ isAdmin: true });
    });
  }
}
