import { Component, ɵdetectChanges } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { YoutubeService } from '../admin/services/youtube.service';

interface Channel {
  id: string;
  title: string;
}

const LOCAL_STORAGE_KEY = 'channels';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent {
  readonly bannedChannels$ = new BehaviorSubject<Channel[]>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'),
  );

  readonly videos$ = this.youtubeApi.getTrendingVideos();

  readonly filteredVideos$ = combineLatest([
    this.videos$,
    this.bannedChannels$,
  ]).pipe(
    map(([videos, bannedChannels]) => {
      return videos.filter(
        (video: any) =>
          !bannedChannels.find(
            channel => channel.id === video.snippet.channelId,
          ),
      );
    }),
    tap(a => {
      // TODO(kirjs): this is terrible / remove.
      requestAnimationFrame(() => {
        ɵdetectChanges(this);
      });
    }),
  );

  banChannel(id: string, title: string) {
    const current = this.bannedChannels$.getValue().filter(a => a.id !== id);
    this.bannedChannels$.next([...current, { id, title }]);
  }

  constructor(private youtubeApi: YoutubeService) {
    this.bannedChannels$.subscribe(channels => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(channels));
    });
  }

  unban(id: string) {
    this.bannedChannels$.next(
      this.bannedChannels$.getValue().filter(a => a.id !== id),
    );
  }
}
