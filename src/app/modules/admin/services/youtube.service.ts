import {Injectable} from '@angular/core';
import {TokensService} from '../api-keys/tokens.service';
import {scan, switchMap} from 'rxjs/operators';
import {interval, Observable} from 'rxjs';
import {stripHtml} from "../utils";
import {UIStream} from '../stream-manager/types';
import {ChatMessage} from '../../overlay/chat/types';
import {maxChatTimeout} from '../../overlay/chat/common';

// First step: obtain the video's 'categoryId'

function toYoutubeDate(date: string): string {
  return date + ':00Z';
}

declare const gapi: any;

interface YoutubeBroadcast {
  id: string;
  snippet: {
    liveChatId: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  clientId = '1091615339826-3rkfjkddctiimpna3evd5sjjvnuikh7c.apps.googleusercontent.com';

  readonly chat$ = new Observable<ChatMessage[]>(({next}) => {
    this.api$.pipe(switchMap(async ({youtube}) => {
      return await youtube.liveChatMessages.list({
        part: 'snippet',
      });
    }));
    next([]);
  });

  readonly api$: Observable<any> = this.tokenService.getToken('youtubeApiKey').pipe(switchMap((apiKey: string) => {
    return new Promise((resolve) => {
      gapi.load('client', async () => {
        await gapi.client.init({
          apiKey,
          clientId: this.clientId,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
          ],
          scope:
            'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly',
        });

        const auth = gapi.auth2.getAuthInstance();

        if (!auth.isSignedIn.get()) {
          await auth.signIn();
        }

        await new Promise(resolveYoutube => {
          gapi.client.load('youtube', 'v3', resolveYoutube);
        });

        resolve({youtube: gapi.client.youtube});
      });
    });
  }));

  constructor(
    private readonly tokenService: TokensService,
  ) {

  }

  updateLiveStreamById(id: string, stream: UIStream): Observable<{ result: YoutubeBroadcast }> {
    return this.api$.pipe(switchMap(async ({youtube}) => {
      return await youtube.liveBroadcasts.update({
        part: 'snippet',
        id,
        snippet: {
          title: stream.name,
          description: stripHtml(stream.description),
          scheduledStartTime: toYoutubeDate(stream.realDateTime)
        },
      });
    }));
  }

  deleteBroadcast(id: string): Observable<void> {
    return this.api$.pipe(switchMap(async ({youtube}) => {
      return await youtube.liveBroadcasts.delete({
        id
      });
    }));
  }

  createBroadcast(stream: UIStream): Observable<{ result: YoutubeBroadcast }> {
    return this.api$.pipe(switchMap(async ({youtube}) => {
      return await youtube.liveBroadcasts.insert({
        part: 'status,snippet,contentDetails',
        status: {
          privacyStatus: 'unlisted'
        },
        snippet: {
          title: stream.name,
          description: stripHtml(stream.description),
          scheduledStartTime: toYoutubeDate(stream.realDateTime)
        },
        contentDetails: {
          recordFromStart: true,
          useDvr: true
        }
      });
    }));
  }

  fetchChat(liveChatId: any): Observable<ChatMessage[]> {
    return this.api$.pipe(
      switchMap(({youtube}) => {
        let nextPageToken: string;

        return interval(1000).pipe(switchMap(a => {
          return youtube.liveChatMessages.list({
            part: 'snippet',
            liveChatId,
            pageToken: nextPageToken,
          }).then((response: any): ChatMessage[] => {
            nextPageToken = response.result.nextPageToken;
            return response.result.items.map((item: any): ChatMessage => {
              return ({
                text: item.snippet.displayMessage,
                author: item.snippet.authorChannelId,
                timestamp: new Date(item.snippet.publishedAt),
              });
            });
          }) as Promise<ChatMessage[]>;
        }));
      }));
  }
}


