import { Component, Input } from '@angular/core';
import { UIStream } from '../admin/stream-manager/types';
import { NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-announce',
    templateUrl: './announce.component.html',
    styleUrls: ['./announce.component.scss'],
    standalone: true,
    imports: [NgIf, DatePipe],
})
export class AnnounceComponent {
  @Input() stream!: UIStream;
}
