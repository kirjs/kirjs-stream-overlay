import { Component, Input } from '@angular/core';
import { UIStream } from '../admin/stream-manager/types';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.scss'],
})
export class AnnounceComponent {
  @Input() stream!: UIStream;
}
