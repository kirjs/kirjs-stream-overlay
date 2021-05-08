import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {Stream, StreamConfig, UIStream} from './types';

import {combineLatest, Observable} from 'rxjs';
import {map, mapTo, switchMap} from 'rxjs/operators';
import {TwitchClient} from '../services/twitch';
import {YoutubeService} from '../services/youtube.service';

const colors = ['#ba0000', '#1e98ea', '#1f7f43'];

const isInThePast = (dateTime: string) => Number(new Date(dateTime)) - Date.now() > 0;

@Injectable({providedIn: 'root'})
export class StreamConfigService {
  constructor(
    private readonly firestore: AngularFirestore,
    private readonly twitchClient: TwitchClient,
    private readonly youtubeService: YoutubeService,
  ) {
  }

  private readonly streamConfig = this.firestore
    .collection('config')
    .doc<StreamConfig>('stream');

  private readonly streams = this.firestore.collection<Stream>('streams', ref =>
    ref.orderBy('lastModified', 'desc'),
  );

  readonly allStreams$: Observable<UIStream[]> = combineLatest([
    this.streams.valueChanges({idField: 'key'}),
    this.streamConfig.valueChanges(),
  ]).pipe(
    map(([streams, streamConfig]) => {
      return streams.map(stream => ({
        ...stream,
        isCurrent: streamConfig?.streamId === stream.key,
      }));
    }),
  );

  readonly pastStreams$ = this.allStreams$.pipe(map(streams => {
    return streams.filter(stream => {
      return !isInThePast(stream.realDateTime);
    });
  }));
  readonly futureStreams$ = this.allStreams$.pipe(map(streams => {
    return streams.filter(stream => {
      return isInThePast(stream.realDateTime);
    });
  }));


  readonly currentStream$ = this.allStreams$.pipe(
    map(streams => streams.find(stream => stream.isCurrent)),
  );

  addNewStream(): void {
    this.streams.add({
      name: 'latest',
      tags: [],
      date: firebase.firestore.FieldValue.serverTimestamp() as any,
      description: '',
      highlights: '',
      language: 'en',
      realDateTime: new Date().toISOString().slice(0, 16),
      color: colors[Math.floor(Math.random() * colors.length)],
      fontColor: '#dddddd',
      promoText: '',
      secondaryTitle: '#Angular',
      lastModified: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  updateStream(doc: UIStream): Promise<void> {
    return this.streams.doc(doc.key).set({
      ...doc,
      lastModified: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  deleteStream(key: string): void {
    this.streams.doc(key).delete();
  }

  duplicateStream(stream: UIStream): void {
    this.streams.add({
      ...stream,
      lastModified: firebase.firestore.FieldValue.serverTimestamp(),
    } as any);
  }


  updateYoutubeStreamInfo(stream: UIStream) {
    return this.youtubeService.updateLiveStream(stream.name, stream.description)
      .pipe(switchMap(({result}) => {
        return this.updateStream({...stream, youtubeId: result.id});
      }));
  }

  selectStream(stream: UIStream): Observable<void> {
    return combineLatest([
      this.twitchClient.updateStreamInfo(stream.name, stream.language || 'en'),
      this.updateYoutubeStreamInfo(stream),
      this.streamConfig.set({streamId: stream.key}),
      this.updateStream(stream),
    ]).pipe(mapTo(undefined));
  }

  nextEpisode(stream: UIStream): void {
    const name = stream.name.replace(/#(\d+)/, (match, n) => {
      return '#' + (Number(n) + 1).toString();
    });

    this.duplicateStream({...stream, name});
  }
}
