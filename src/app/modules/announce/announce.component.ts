import { Component, OnInit } from '@angular/core';
import {WaitingService} from "../admin/waiting-screen-editor/waiting.service";

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.scss']
})
export class AnnounceComponent implements OnInit {

  constructor(public readonly waitingService: WaitingService) {

  }

  ngOnInit(): void {
  }

}
