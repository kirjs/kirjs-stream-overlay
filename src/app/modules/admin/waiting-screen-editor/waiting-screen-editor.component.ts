import {ChangeDetectionStrategy, Component} from '@angular/core';
import {WaitingService} from './waiting.service';
import {UIStream} from "./types";
import {BehaviorSubject, combineLatest} from "rxjs";
import {first, map, take} from "rxjs/operators";
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-waiting-screen-editor',
  templateUrl: './waiting-screen-editor.component.html',
  styleUrls: ['./waiting-screen-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingScreenEditorComponent {
  constructor(readonly waitingService: WaitingService) {
  }

  readonly selectedStreamKey = new BehaviorSubject<string | undefined>(undefined);

  readonly selectedStreamKey$ = combineLatest(
    [
      this.selectedStreamKey,
      this.waitingService.allStreams$
        .pipe(first())
    ])
    .pipe(map(([selectedStreamKey, allStreams]) => {
      return selectedStreamKey || allStreams[0]?.key;
    }));

  readonly currentStream$ = combineLatest([
    this.waitingService.allStreams$,
    this.selectedStreamKey$
  ]).pipe(map(([allStreams, key]) => {
      return allStreams.find(stream => stream.key === key);
    }
  ));

  addNewStream(): void {
    this.waitingService.addNewStream();
  }

  trackByKey(i: number, object: UIStream): string {
    return object.key;
  }

  updateStreamName(stream: UIStream, name: string): void {
    this.waitingService.updateStream({...stream, name});
  }

  updateStreamColor(stream: UIStream, color: string): void {
    this.waitingService.updateStream({...stream, color});
  }

  updateByPropName(stream: UIStream, name: string, value: string): void {
    this.waitingService.updateStream({...stream, [name]: value});
  }

  updateStreamDate(stream: UIStream, streamDate: any): void {
    this.updateByPropName(stream, 'streamDate', streamDate);

  }

  updateStreamDescription(stream: UIStream, description: any): void {
    this.waitingService.updateStream({...stream, description});
  }

  async downloadImage(el: HTMLDivElement) {

    const image = await domtoimage.toPng(el);
    const link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = image;
    link.click();
    console.log(domtoimage);
  }

  deleteStream() {


  }
}
