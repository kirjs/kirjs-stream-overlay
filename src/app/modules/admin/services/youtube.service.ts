import {Injectable} from '@angular/core';
import {TokensService} from '../api-keys/tokens.service';
import {HttpClient} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

// First step: obtain the video's 'categoryId'

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  clientId = '1091615339826-3rkfjkddctiimpna3evd5sjjvnuikh7c.apps.googleusercontent.com';

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

  updateLiveStream(title: string): Observable<void> {
    return this.api$.pipe(switchMap(async ({youtube}) => {
      const broadcasts = await youtube.liveBroadcasts.list({mine: true});

      const activeBroadcast = broadcasts.result.items.find((s: any) => s.status.recordingStatus === 'recording');

      await youtube.liveBroadcasts.update({
        part: 'snippet',
        id: activeBroadcast.id,
        snippet: {
          ...activeBroadcast.snippet,
          title,
          description: 'Пока не знаю как обновлять дескрипшн :(',
        },
      });
    }));
  }
}
