import {ChangeDetectionStrategy, Component} from '@angular/core';
import {StreamConfigService} from './stream-config.service';
import {UIStream} from './types';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {first, map} from 'rxjs/operators';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-waiting-screen-editor',
  templateUrl: './waiting-screen-editor.component.html',
  styleUrls: ['./waiting-screen-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingScreenEditorComponent {
  constructor(readonly streamConfigService: StreamConfigService) {
  }

  readonly selectedStreamKey = new BehaviorSubject<string | undefined>(
    undefined,
  );

  readonly selectedStreamKey$ = combineLatest([
    this.selectedStreamKey,
    this.streamConfigService.allStreams$.pipe(first()),
  ]).pipe(
    map(([selectedStreamKey, allStreams]) => {
      return selectedStreamKey || allStreams[0]?.key;
    }),
  );

  readonly currentStream$ = combineLatest([
    this.streamConfigService.allStreams$,
    this.selectedStreamKey$,
  ]).pipe(
    map(([allStreams, key]) => {
      return allStreams.find(stream => stream.key === key);
    }),
  );

  addNewStream(): void {
    this.streamConfigService.addNewStream();
  }

  trackByKey(i: number, object: UIStream): string {
    return object.key;
  }

  updateStreamName(stream: UIStream, name: string): void {
    this.streamConfigService.updateStream({...stream, name});
  }

  updateStreamColor(stream: UIStream, color: string): void {
    this.streamConfigService.updateStream({...stream, color});
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

  updateStreamDate(stream: UIStream, streamDate: any): void {
    this.updateByPropName(stream, 'streamDate', streamDate);
  }


  updateStreamDescription(stream: UIStream, description: any): void {
    this.streamConfigService.updateStream({...stream, description});
  }

  async downloadImage(el: HTMLDivElement): Promise<void> {
    const image = await domtoimage.toPng(el);
    const link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = image;
    link.click();
  }

  deleteStream(key: string): void {
    this.streamConfigService.deleteStream(key);
  }

  duplicateStream(stream: UIStream): void {
    this.streamConfigService.duplicateStream(stream);
  }

  nextEpisode(stream: UIStream): void {
    this.streamConfigService.nextEpisode(stream);
  }

  startStream(stream: UIStream): void {
    this.streamConfigService.selectStream(stream);
  }
}
