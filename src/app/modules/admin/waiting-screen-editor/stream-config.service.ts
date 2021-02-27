import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {Stream, UIStream} from './types';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

const colors = [
  '#ba0000',
  '#1e98ea',
  '#1f7f43',
];

@Injectable({providedIn: 'root'})
export class StreamConfigService {

  constructor(readonly firestore: AngularFirestore) {
  }

  private readonly streams =
    this.firestore.collection<Stream>('streams');

  readonly allStreams$ = this.firestore.collection<UIStream>('streams').valueChanges({idField: 'key'});

  readonly latestStream$: Observable<UIStream> = this.firestore.collection<UIStream>('streams', ref =>
    ref.orderBy('date', 'desc')
      .limit(1)
  ).valueChanges({idField: 'key'})
    .pipe(map(a => a[0] || []));


  addNewStream(): void {
    this.streams.add({
      name: 'latest',
      tags: [],
      streamDate: 'Сегодня',
      date: firebase.firestore.FieldValue.serverTimestamp() as any,
      description: 'TBD',
      highlights: '',
      color: colors[Math.floor(Math.random() * colors.length)],
      fontColor: '#dddddd',
    });
  }

  updateStream(doc: UIStream): void {
    this.streams.doc(doc.key).set(doc);
  }
}
