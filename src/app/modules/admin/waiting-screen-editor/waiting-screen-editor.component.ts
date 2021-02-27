import {ChangeDetectionStrategy, Component} from '@angular/core';
import {WaitingService} from './waiting.service';
import {UIStream} from "./types";
import {BehaviorSubject, combineLatest} from "rxjs";
import {map} from "rxjs/operators";


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

  readonly currentStream$ = combineLatest([
    this.waitingService.allStreams$,
    this.selectedStreamKey
  ]).pipe(map(([allStreams, key]) => {
      return allStreams.find(stream => stream.key === key) || allStreams[0];
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
}