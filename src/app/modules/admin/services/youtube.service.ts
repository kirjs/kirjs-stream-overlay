import { Injectable } from '@angular/core';
import { from, interval, Observable, of, timer } from 'rxjs';
import {
  filter,
  last,
  map,
  mapTo,
  switchMap,
  take,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { ChatMessage } from '../../overlay/chat/types';
import { TokensService } from '../api-keys/tokens.service';
import { UIStream } from '../stream-manager/types';
import { stripHtml } from '../utils';

// First step: obtain the video's 'categoryId'

function toYoutubeDate(date: string): string {
  return date + ':00Z';
}

const CHAT_POLL_INTERVAL = 5000;
const BROADCAST_STATUS_POLL_INTERVAL = 1000;

declare const gapi: any;

interface YoutubeBroadcast {
  id: string;
  snippet: {
    liveChatId: string;
  };
}

type BroadcastStatus = 'live' | 'testing' | 'complete';

const REQUIRED_SCOPES = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.readonly',
];

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  clientId =
    '703581438271-mskchlesu6j0hr4ftsbd95hhemjoplba.apps.googleusercontent.com';
  readonly api$: Observable<any> = this.tokenService
    .getToken('youtubeApiKey')
    .pipe(
      take(1),
      switchMap((apiKey: string) => {
        return new Promise(resolve => {
          gapi.load('client', async () => {
            await gapi.client.init({
              apiKey,
              clientId: this.clientId,
              discoveryDocs: [
                'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
              ],
              scope: REQUIRED_SCOPES.join(' '),
            });

            const auth = gapi.auth2.getAuthInstance();
            const user = auth.currentUser.get();

            const hasAllScopes = REQUIRED_SCOPES.every(scope =>
              user.hasGrantedScopes(scope),
            );

            if (!hasAllScopes || !auth.isSignedIn.get()) {
              await auth.signIn({
                ux_mode: 'redirect',
              });
            }

            await new Promise(resolveYoutube => {
              gapi.client.load('youtube', 'v3', resolveYoutube);
            });

            resolve({ youtube: gapi.client.youtube });
          });
        });
      }),
    );

  constructor(private readonly tokenService: TokensService) {}

  updateLiveBroadcastById(
    id: string,
    stream: UIStream,
  ): Observable<{ result: YoutubeBroadcast }> {
    return this.api$.pipe(
      switchMap(async ({ youtube }) => {
        return await youtube.liveBroadcasts.update({
          part: 'snippet',
          id,
          snippet: {
            title: stream.name,
            description: stripHtml(stream.description),
            scheduledStartTime: toYoutubeDate(stream.realDateTime),
          },
        });
      }),
    );
  }

  deleteBroadcast(id: string): Observable<void> {
    return this.api$.pipe(
      switchMap(async ({ youtube }) => {
        return await youtube.liveBroadcasts.delete({
          id,
        });
      }),
    );
  }

  createBroadcast(stream: UIStream): Observable<{ result: YoutubeBroadcast }> {
    return this.api$.pipe(
      switchMap(async ({ youtube }) => {
        return await youtube.liveBroadcasts.insert({
          part: 'status,snippet,contentDetails',
          status: {
            privacyStatus: 'unlisted',
          },
          snippet: {
            title: stream.name,
            description: stripHtml(stream.description),
            scheduledStartTime: toYoutubeDate(stream.realDateTime),
          },
          contentDetails: {
            recordFromStart: true,
            useDvr: true,
          },
        });
      }),
    );
  }

  fetchChat(liveChatId: any): Observable<ChatMessage[]> {
    return this.api$.pipe(
      switchMap(({ youtube }) => {
        let nextPageToken: string;

        return interval(CHAT_POLL_INTERVAL).pipe(
          switchMap(() => {
            return youtube.liveChatMessages
              .list({
                part: 'snippet,authorDetails',
                liveChatId,
                pageToken: nextPageToken,
              })
              .then((response: any): ChatMessage[] => {
                nextPageToken = response.result.nextPageToken;
                return response.result.items.map((item: any): ChatMessage => {
                  return {
                    text: item.snippet.displayMessage,
                    displayName: item.authorDetails.displayName,
                    profileUrl: item.authorDetails.profileImageUrl,
                    timestamp: new Date(item.snippet.publishedAt),
                  };
                });
              }) as Promise<ChatMessage[]>;
          }),
        );
      }),
    );
  }

  bindBroadcastToStream(id: string, streamId: string): Observable<any> {
    return this.api$.pipe(
      switchMap(({ youtube }) => {
        return youtube.liveBroadcasts.bind({
          part: 'snippet,status,contentDetails',
          id,
          streamId,
        });
      }),
    );
  }

  getBroadcast(id: string): Observable<any> {
    return this.api$.pipe(
      switchMap(async ({ youtube }) => {
        return await youtube.liveBroadcasts
          .list({
            snippet: 'status,contentDetails',
            id,
          })
          .then((response: any) => response.result.items[0]);
      }),
    );
  }

  getBroadcastStatus(id: string) {
    return this.getBroadcast(id).pipe(
      map(broadcast => {
        return broadcast.status.lifeCycleStatus;
      }),
    );
  }

  waitForBroadcastStatus(id: string, status: BroadcastStatus) {
    return timer(0, BROADCAST_STATUS_POLL_INTERVAL).pipe(
      switchMap(() => {
        return this.getBroadcastStatus(id);
      }),
      takeWhile(broadcastStatus => {
        console.log(broadcastStatus);
        return broadcastStatus !== status;
      }),
      last(),
      tap(st => console.log({ st })),
    );
  }

  linkToStream(stream: UIStream): Observable<any> {
    return this.getActiveLivestream().pipe(
      switchMap(livesStream =>
        this.bindBroadcastToStream(stream.youtubeId!, livesStream.id),
      ),
      switchMap((broadcast: any) => {
        const status = broadcast.result.status.lifeCycleStatus;
        if (status === 'testing' || status === 'live') {
          return of(broadcast);
        }

        if (status === 'ready') {
          // TODO(kirjs): Find a better alternative
          broadcast.result.status.lifeCycleStatus = 'testing';
          return this.transitionBroadcast(broadcast.result.id, 'testing').pipe(
            mapTo(broadcast),
          );
        }
        throw new Error('Unexpected status');
      }),
      switchMap((broadcast: any) => {
        if (broadcast.result.status.lifeCycleStatus === 'testing') {
          return this.transitionBroadcast(broadcast.result.id, 'live');
        }

        return of(broadcast);
      }),
    );
  }

  private transitionBroadcast(id: string, broadcastStatus: BroadcastStatus) {
    return this.api$.pipe(
      switchMap(({ youtube }) => {
        return youtube.liveBroadcasts.transition({
          id,
          broadcastStatus,
          part: 'snippet',
        });
      }),
      switchMap((broadcast: any) => {
        return this.waitForBroadcastStatus(
          broadcast.result.id,
          broadcastStatus,
        );
      }),
    );
  }

  getTrendingVideos() {
    return this.api$.pipe(
      switchMap(({ youtube }) => {
        return youtube.videos.list({
          part: 'snippet',
          chart: 'mostPopular',
          regionCode: 'RU',
          maxResults: '250',
        });
      }),
      map((a: any) => {
        return a.result.items;
      }),
    );
  }

  private getActiveLivestream() {
    return this.api$.pipe(
      switchMap(({ youtube }) => {
        return from(
          youtube.liveStreams.list({
            part: 'snippet,status',
            mine: true,
          }),
        ).pipe(
          map((response: any) => {
            return response.result.items.find(
              (i: any) => i.status.streamStatus === 'active',
            );
          }),
          filter(a => !!a),
        );
      }),
    );
  }
}
