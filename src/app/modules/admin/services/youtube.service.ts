import { Injectable } from '@angular/core';
import { TokensService } from '../api-keys/tokens.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// First step: obtain the video's 'categoryId'

declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  readonly baseUrl = 'https://www.googleapis.com/youtube/v3/';

  //videos?part=id,snippet
  clientId = '';
  secret = '';
  apiKey = '';
  constructor(
    private readonly tokenService: TokensService,
    private readonly http: HttpClient,
  ) {
    this.init();
  }

  init() {
    // gapi.load('client', () => {
    //   gapi.client.init({
    //     apiKey: this.apiKey,
    //     clientId: this.clientId,
    //     discoveryDocs: [
    //       'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
    //     ],
    //     scope:
    //       'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly',
    //   });
    //
    //   gapi.client.load('youtube', 'v3', () => console.log('loaded youtube'));
    // });
  }

  getLiveStreams() {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    //
    // this.youtubeKey$.subscribe(async key => {
    //   const url =
    //     this.baseUrl +
    //     `liveStreams?key=AIzaSyDdpOW__Ut8x-KU1hXvSwiPoGlBbYwWJLw`;
    //   try {
    //     this.http.get(url, { headers }).subscribe();
    //   } catch (e) {
    //     debugger;
    //   }
    // });
  }

  getBroadcasts() {}

  private youtubeKey$ = this.tokenService.getToken('youtubeApiKey');

  // updateTitle(title: string, description: string) {
  //   this.youtubeKey$
  //     .pipe(
  //       switchMap(() => {
  //         const data2 = {
  //           id: 'MDaEvnSioI',
  //           snippet: {
  //             title,
  //             description,
  //           },
  //         };
  //
  //         const options2 = {
  //           contentType: 'application/json',
  //           payload: JSON.stringify(data2),
  //           method: 'put',
  //         };
  //
  //         // return fetch(this.url, options2);
  //       }),
  //     )
  //     .subscribe();
  // }
}
