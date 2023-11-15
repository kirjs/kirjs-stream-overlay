import { Component, Input } from '@angular/core';
import { UIStream } from '../../types';
import { NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-stream-list-item',
    templateUrl: './stream-list-item.component.html',
    styleUrls: ['./stream-list-item.component.scss'],
    standalone: true,
    imports: [NgIf, DatePipe],
})
export class StreamListItemComponent {
  @Input() stream!: UIStream;
}
