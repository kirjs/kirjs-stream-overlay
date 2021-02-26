import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {WaitingService} from "../admin/waiting-screen-editor/waiting.service";


@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.scss'],
})
export class WaitingScreenComponent implements OnInit {
  constructor(public readonly waitingService: WaitingService) {

  }

  ngOnInit(): void {
  }

}
