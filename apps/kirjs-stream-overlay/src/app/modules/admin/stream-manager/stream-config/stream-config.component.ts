import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import domtoimage from 'dom-to-image';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LapteuhService } from '../../guest/lapteuh.service';
import {
  TelegramChannel,
  TelegramService,
} from '../../services/telegram.service';
import { normalizeSpaces } from '../../utils';
import { StreamConfigService } from '../stream-config.service';
import { UIStream } from '../types';
import { AnnounceComponent } from '../../../announce/announce.component';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WysiwygEditorComponent } from '../wysiwyg-editor/wysiwyg-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

const generatePromoText = (stream?: UIStream) => {
  if (!stream) {
    return '';
  }
  const fields: Record<string, string> = {
    youtubeUrl: 'youtu.be/' + stream.youtubeId,
    //  TODO(kirjs): Take this from config
    twitchUrl: 'twitch.tv/kirjs',
    talkUrl: 'twitch.tv/kirjs',
    description: normalizeSpaces(stream.description),
  };
  const text = normalizeSpaces(stream.promoText);
  return text.replaceAll(/{(\w+)}/g, (text, param) => {
    if (fields[param]) {
      return fields[param];
    }
    return param;
  });
};

export function escapeLapteuhMarkdown(str: string): string {
  return str.replaceAll(/([_*\[\]()~`>#+-=|{}.!])/g, '\\$1');
}

@Component({
    selector: 'app-stream-config',
    templateUrl: './stream-config.component.html',
    styleUrls: ['./stream-config.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        NgFor,
        ReactiveFormsModule,
        FormsModule,
        WysiwygEditorComponent,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatOptionModule,
        AnnounceComponent,
        AsyncPipe,
    ],
})
export class StreamConfigComponent {
  readonly selectedStreamKey$ = this.route.params.pipe(
    map(a => {
      return a.id;
    }),
  );
  readonly channels$ = this.telegramService.channels$;
  readonly currentStream$ = combineLatest([
    this.streamConfigService.allStreams$,
    this.selectedStreamKey$,
  ]).pipe(
    map(([allStreams, key]) => {
      return allStreams.find(stream => stream.key === key);
    }),
  );

  readonly promoText$ = this.currentStream$.pipe(map(generatePromoText));

  constructor(
    readonly streamConfigService: StreamConfigService,
    private readonly telegramService: TelegramService,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    public readonly guestService: LapteuhService,
  ) {}

  deleteStream(key: string, youtubeId?: string): void {
    this.streamConfigService.deleteStream(key, youtubeId).subscribe();
  }

  duplicateStream(stream: UIStream): void {
    this.streamConfigService.duplicateStream(stream);
  }

  startStream(stream: UIStream): void {
    this.streamConfigService.selectStream(stream).subscribe(
      () => {
        this.snackBar.open('Stream started successfully', 'ok', {
          duration: 500,
        });
      },
      e => {
        // TODO(kirjs): Standardize other errors.
        this.snackBar.open(e.error || e.result?.error?.message, 'ok');
      },
    );
  }

  updateByPropName(
    stream: UIStream,
    name: keyof UIStream,
    value: string,
  ): void {
    if (stream[name] !== value) {
      this.streamConfigService.updateStream({ ...stream, [name]: value });
    }
  }

  nextEpisode(stream: UIStream): void {
    this.streamConfigService.nextEpisode(stream);
  }

  generateImage(el: Element): Promise<Blob> {
    return domtoimage.toBlob(el);
  }

  async postToTelegram(
    announce: Element,
    stream: UIStream,
    channel: TelegramChannel,
  ): Promise<void> {
    const wrapper = announce.querySelector('.wrapper') as HTMLDivElement;
    const image = await this.generateImage(wrapper);

    const promoText = escapeLapteuhMarkdown(generatePromoText(stream));

    this.telegramService.postImage(image, promoText, channel.chatId).subscribe(
      () => {
        this.snackBar.open('posted successfully', 'ok', { duration: 500 });
      },
      e => {
        this.snackBar.open(e.error.description, 'ok');
      },
    );
  }

  createBroadcast(stream: UIStream): void {
    this.streamConfigService.createYoutubeBroadcast(stream).subscribe();
  }

  linkToStream(stream: UIStream): void {
    this.streamConfigService.linkToStream(stream).subscribe(
      () => {
        this.snackBar.open('Stream linked successfully', 'ok', {
          duration: 500,
        });
      },
      e => {
        this.snackBar.open(e.result?.error?.message, 'ok');
      },
    );
  }

  addGuest(stream: UIStream, $event: any) {
    // this.updateByPropName(stream, 'guests', [
    //   ...stream.guests,
    //   $event.option.value.key,
    // ]);
  }
}
