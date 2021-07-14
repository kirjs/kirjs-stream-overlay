import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { StreamConfigService } from '../stream-config.service';
import { UIStream } from '../types';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss'],
})
export class StreamListComponent {
  readonly selectedStreamKey$ = this.streamConfigService.currentStream$.pipe(
    map(p => p?.key),
  );

  constructor(readonly streamConfigService: StreamConfigService) {}

  trackByKey(i: number, object: UIStream): string {
    return object.key;
  }

  addNewStream() {
    this.streamConfigService.addNewStream();
  }
}
