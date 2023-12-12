import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  readonly reward$ = docData(
    doc(this.firestore, 'users/kirjs/plugins/rewards'),
  ).pipe(
    map(a => {
      return a?.winner;
    }),
  );

  constructor(readonly firestore: Firestore) {}
}
