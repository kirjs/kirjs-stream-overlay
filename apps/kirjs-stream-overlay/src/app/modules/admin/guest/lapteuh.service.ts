import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Guest } from './guest_types';

@Injectable({
  providedIn: 'root',
})
export class LapteuhService {
  readonly guest = collection(
    this.firestore,
    'users/kirjs/guests',
  ) as CollectionReference<Guest>;

  readonly guests$: Observable<Guest[]> = collectionData<Guest>(this.guest, {
    idField: 'key',
  });

  constructor(private readonly firestore: Firestore) {}

  addGuest(guest: Guest): void {
    addDoc(this.guest, guest);
  }

  updateGuest(key: string, guest: Guest): void {
    setDoc(doc(this.guest, key), guest);
  }

  removeGuest(key: string): void {
    deleteDoc(doc(this.guest, key));
  }
}
