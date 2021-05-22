import {Component, Input} from '@angular/core';
import {UIStream} from '../../types';


@Component({
  selector: 'app-stream-list-item',
  templateUrl: './stream-list-item.component.html',
  styleUrls: ['./stream-list-item.component.scss'],
})
export class StreamListItemComponent {
  @Input() stream!: UIStream;
}
