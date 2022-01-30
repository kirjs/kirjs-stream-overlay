import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { StreamConfigService } from './stream-config.service';
import { UIStream } from './types';

@Component({
  selector: 'app-stream-manager',
  templateUrl: './stream-manager.component.html',
  styleUrls: ['./stream-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamManagerComponent {
  constructor(readonly streamConfigService: StreamConfigService) {}

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
    this.streamConfigService.updateStream({ ...stream, name });
  }

  updateStreamColor(stream: UIStream, color: string): void {
    this.streamConfigService.updateStream({ ...stream, color });
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
}
