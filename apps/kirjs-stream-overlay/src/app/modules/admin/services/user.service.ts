import { Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly admins = collection(this.firestore, 'users/kirjs/admins');

  constructor(private readonly firestore: Firestore) {}
}
