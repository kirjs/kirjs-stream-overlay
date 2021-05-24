import {Component} from '@angular/core';
import {UIStream} from '../types';
import {StreamConfigService} from '../stream-config.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent {
  readonly selectedStreamKey$ = this.streamConfigService.currentStream$
    .pipe(map(p => p?.key));

  constructor(
    readonly streamConfigService: StreamConfigService,
  ) {
  }

  trackByKey(i: number, object: UIStream): string {
    return object.key;
  }

  addNewStream() {
    this.streamConfigService.addNewStream();
  }
}
