import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Stream, StreamConfig, UIStream } from './types';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TwitchClient } from '../../../twitch';

const colors = ['#ba0000', '#1e98ea', '#1f7f43'];

@Injectable({ providedIn: 'root' })
export class StreamConfigService {
  constructor(
    readonly firestore: AngularFirestore,
    readonly twitchClient: TwitchClient,
  ) {}

  private readonly streamConfig = this.firestore
    .collection('config')
    .doc<StreamConfig>('stream');

  private readonly streams = this.firestore.collection<Stream>('streams');

  readonly allStreams$: Observable<UIStream[]> = combineLatest([
    this.streams.valueChanges({ idField: 'key' }),
    this.streamConfig.valueChanges(),
  ]).pipe(
    map(([streams, streamConfig]) => {
      return streams.map(stream => ({
        ...stream,
        isCurrent: streamConfig?.streamId === stream.key,
      }));
    }),
  );

  readonly currentStream$ = this.allStreams$.pipe(
    map(streams => streams.find(stream => stream.isCurrent)),
  );

  addNewStream(): void {
    this.streams.add({
      name: 'latest',
      tags: [],
      streamDate: 'Сегодня',
      date: firebase.firestore.FieldValue.serverTimestamp() as any,
      description: '',
      highlights: '',
      language: 'en',
      color: colors[Math.floor(Math.random() * colors.length)],
      fontColor: '#dddddd',
      promoText: '',
      secondaryTitle: '#Angular',
    });
  }

  updateStream(doc: UIStream): void {
    this.streams.doc(doc.key).set(doc);
  }

  deleteStream(key: string): void {
    this.streams.doc(key).delete();
  }

  duplicateStream(stream: UIStream): void {
    this.streams.add({
      ...stream,
    } as any);
  }

  selectStream(stream: UIStream): void {
    this.twitchClient.updateStreamInfo(stream.name, stream.language || 'en');
    this.streamConfig.set({ streamId: stream.key });
  }
}
