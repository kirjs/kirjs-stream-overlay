import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { TwitchService } from '../services/twitch';
import { YoutubeService } from '../services/youtube.service';
import { Stream, StreamConfig, UIStream } from './types';
import { ZoneBlocker } from './ZoneBlocker';

const colors = ['#ba0000', '#1e98ea', '#1f7f43'];

const isInThePast = (dateTime: string) =>
  Number(new Date(dateTime)) - Date.now() > 0;

@Injectable({ providedIn: 'root' })
export class StreamConfigService {
  // <StreamConfig>
  private readonly streamConfig = doc(this.firestore, 'config', 'stream');

  // <Stream>
  private readonly streams = collection(
    this.firestore,
    'streams',
  ) as CollectionReference<Stream>;

  private readonly streamsByLastModified = query<Stream>(
    this.streams,
    orderBy('lastModified', 'desc'),
  );

  // TODO(kirjs): Figure out types
  readonly allStreams$: Observable<UIStream[]> = combineLatest([
    collectionData(this.streamsByLastModified, {
      idField: 'key',
    }),
    docData<StreamConfig>(this.streamConfig),
  ]).pipe(
    map(([streams, streamConfig]) => {
      return streams.map(stream => ({
        ...stream,
        isCurrent: streamConfig?.streamId === (stream as UIStream).key,
      }));
    }),
  ) as unknown as Observable<UIStream[]>;

  readonly pastStreams$ = this.allStreams$.pipe(
    map(streams => {
      return streams.filter(stream => {
        return !isInThePast(stream.realDateTime);
      });
    }),
    tap(a => {
      this.unblock();
    }),
  );
  readonly futureStreams$ = this.allStreams$.pipe(
    map(streams => {
      return streams.filter(stream => {
        return isInThePast(stream.realDateTime);
      });
    }),
  );
  readonly currentStream$ = this.allStreams$.pipe(
    map(streams => streams.find(stream => stream.isCurrent)),
  );

  private unblock: () => void;

  constructor(
    private readonly firestore: Firestore,
    private readonly twitchClient: TwitchService,
    private readonly youtubeService: YoutubeService,
    private readonly zoneBlocker: ZoneBlocker,
    private readonly router: Router, // private readonly restreamService: RestreamService,
  ) {
    this.unblock = zoneBlocker.blockZone();
  }

  addNewStream(): void {
    addDoc(this.streams, {
      name: 'latest',
      tags: [],
      date: serverTimestamp(),
      description: '',
      highlights: '',
      language: 'en',
      talkUrl: 'https://meet.google.com/bdk-davb-ibi',
      realDateTime: new Date().toISOString().slice(0, 16),
      color: colors[Math.floor(Math.random() * colors.length)],
      fontColor: '#dddddd',
      promoText: '',
      showChat: true,
      autoPostToChat: true,
      lastModified: serverTimestamp(),
    });
  }

  updateStream(document: UIStream): Promise<void> {
    return setDoc(doc(this.streams, document.key), {
      ...document,
      lastModified: serverTimestamp(),
    });
  }

  deleteStream(key: string, youtubeId?: string): Observable<any> {
    return combineLatest([
      deleteDoc(doc(this.streams, key)),
      youtubeId
        ? this.youtubeService.deleteBroadcast(youtubeId)
        : of(undefined),
    ]).pipe(
      tap(() => {
        this.router.navigate(['/', 'admin', 'streams']);
      }),
    );
  }

  async duplicateStream(stream: UIStream): Promise<void> {
    const clonedStream = {
      ...stream,
      realDateTime: new Date().toISOString().slice(0, 16),
      lastModified: serverTimestamp(),
    };

    delete clonedStream.youtubeId;
    const result = await addDoc(this.streams, clonedStream);
    await this.router.navigate(['/', 'admin', 'streams', result.id]);
  }

  setYoutubeBroadcast(stream: UIStream): Observable<any> {
    if (stream.youtubeId) {
      return this.updateYoutubeBroadcast(stream.youtubeId, stream);
    } else {
      return this.createYoutubeBroadcast(stream);
    }
  }

  updateYoutubeBroadcast(youtubeId: string, stream: UIStream): Observable<any> {
    return this.youtubeService.updateLiveBroadcastById(youtubeId, stream).pipe(
      switchMap(({ result }) => {
        // TODO(kirjs): We prob won't need this once everything works properly
        return this.updateStream({
          ...stream,
          lapteuhYoutubeLiveChatId: result.snippet.liveChatId,
        });
      }),
    );
  }

  createYoutubeBroadcast(stream: UIStream): Observable<any> {
    return this.youtubeService.createBroadcast(stream).pipe(
      switchMap(({ result }) => {
        return this.updateStream({
          ...stream,
          youtubeId: result.id,
          lapteuhYoutubeLiveChatId: result.snippet.liveChatId,
        });
      }),
    );
  }

  selectStream(stream: UIStream): Observable<void> {
    return combineLatest([
      // TODO(kirjs): clean up
      this.twitchClient.updateStreamInfo(stream.name, stream.language || 'en'),
      this.setYoutubeBroadcast(stream),
      setDoc(this.streamConfig, { streamId: stream.key }),
      this.updateStream(stream),
      // this.restreamService.updateTitle(stream.name),
    ]).pipe(mapTo(undefined));
  }

  nextEpisode(stream: UIStream): void {
    const name = stream.name.replace(/#(\d+)/, (match, n) => {
      return '#' + (Number(n) + 1).toString();
    });

    this.duplicateStream({ ...stream, name });
  }

  linkToStream(stream: UIStream): Observable<any> {
    return this.youtubeService.linkToStream(stream);
  }
}
