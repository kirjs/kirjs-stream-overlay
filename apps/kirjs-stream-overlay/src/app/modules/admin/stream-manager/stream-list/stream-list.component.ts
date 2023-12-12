import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { StreamConfigService } from '../stream-config.service';
import { UIStream } from '../types';
import { RouterLink } from '@angular/router';
import { StreamListItemComponent } from './stream-list-item/stream-list-item.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-stream-list',
    templateUrl: './stream-list.component.html',
    styleUrl: './stream-list.component.scss',
    standalone: true,
    imports: [
        MatButtonModule,
        NgFor,
        StreamListItemComponent,
        RouterLink,
        AsyncPipe,
    ],
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
