import { Component } from '@angular/core';
import { StreamConfigService } from '../admin/stream-manager/stream-config.service';
import { UIStream } from '../admin/stream-manager/types';
import { AnnounceComponent } from '../announce/announce.component';
import { NgIf, NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { AdminButtonComponent } from './admin-button/admin-button.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        AdminButtonComponent,
        NgIf,
        NgFor,
        AnnounceComponent,
        AsyncPipe,
        DatePipe,
    ],
})
export class HomeComponent {
  constructor(readonly streamConfigService: StreamConfigService) {}

  trackByKey(i: number, object: UIStream): string {
    return object.key;
  }
}
