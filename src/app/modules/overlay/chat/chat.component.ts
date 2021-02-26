import {Component, OnInit} from '@angular/core';
import {TwitchClient} from "../../../twitch";
import {interval, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {WaitingService} from "../../admin/waiting-screen-editor/waiting.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  timeout = 30000;



  constructor(
    readonly waitingService: WaitingService,
    readonly twitch: TwitchClient) {


  }


  ngOnInit(): void {
  }

}
