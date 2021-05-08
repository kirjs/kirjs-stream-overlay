import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UIStream} from "../types";

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent {

  @Input() streams!: UIStream[];
  @Output() selectStream = new EventEmitter();
  @Input() selectedStreamKey: string|null = null;

  constructor() {
  }

  trackByKey(i: number, object: UIStream): string {
    return object.key;
  }


}
