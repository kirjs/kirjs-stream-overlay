import { Component, inject } from '@angular/core';
import { StreamConfigService } from '../admin/stream-manager/stream-config.service';
import { AnnounceComponent } from '../announce/announce.component';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { AdminButtonComponent } from './admin-button/admin-button.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [AdminButtonComponent, AnnounceComponent, AsyncPipe, DatePipe],
})
export class HomeComponent {
  protected readonly streamConfigService = inject(StreamConfigService);
}
