import {Component} from '@angular/core';
import {StreamConfigService} from "../admin/waiting-screen-editor/stream-config.service";
import {UIStream} from "../admin/waiting-screen-editor/types";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(readonly streamConfigService: StreamConfigService) {
  }

  trackByKey(i: number, object: UIStream): string {
    return object.key;
  }
}
