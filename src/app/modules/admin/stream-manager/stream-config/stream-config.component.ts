import {Component, OnInit} from '@angular/core';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {StreamConfigService} from '../stream-config.service';
import {TelegramService} from '../../services/telegram.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {UIStream} from '../types';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-stream-config',
  templateUrl: './stream-config.component.html',
  styleUrls: ['./stream-config.component.scss']
})
export class StreamConfigComponent implements OnInit {
  readonly selectedStreamKey$ = this.route.params.pipe(map(a => {
    return a.id;
  }));

  constructor(
    readonly streamConfigService: StreamConfigService,
    private readonly telegramService: TelegramService,
    private readonly  snackBar: MatSnackBar,
    private readonly route: ActivatedRoute) {
  }


  readonly currentStream$ = combineLatest([
    this.streamConfigService.allStreams$,
    this.selectedStreamKey$,
  ]).pipe(
    map(([allStreams, key]) => {
      return allStreams.find(stream => stream.key === key);
    }),
  );

  deleteStream(key: string): void {
    this.streamConfigService.deleteStream(key);
  }

  duplicateStream(stream: UIStream): void {
    this.streamConfigService.duplicateStream(stream);
  }

  startStream(stream: UIStream): void {

    this.streamConfigService.selectStream(stream).subscribe(() => {
      this.snackBar.open('Stream started successfully', 'ok', {duration: 500});
    }, (e) => {
      this.snackBar.open(e.error.description, 'ok');
    });
  }

  updateByPropName(
    stream: UIStream,
    name: keyof UIStream,
    value: string,
  ): void {
    if (stream[name] !== value) {
      this.streamConfigService.updateStream({...stream, [name]: value});
    }
  }

  nextEpisode(stream: UIStream): void {
    this.streamConfigService.nextEpisode(stream);
  }


  generateImage(el: Element): Promise<Blob> {
    return domtoimage.toBlob(el);
  }


  async postToTelegram(announce: Element, stream: UIStream): Promise<void> {
    const wrapper = announce.querySelector('.wrapper') as HTMLDivElement;
    const image = await this.generateImage(wrapper);

    this.telegramService.postImage(image, stream.promoText).subscribe(() => {
      this.snackBar.open('posted successfully', 'ok', {duration: 500});
    }, (e) => {
      this.snackBar.open(e.error.description, 'ok');
    });
  }

  ngOnInit(): void {
  }

}
