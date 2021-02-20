import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-waiting-screen-editor',
  templateUrl: './waiting-screen-editor.component.html',
  styleUrls: ['./waiting-screen-editor.component.scss']
})
export class WaitingScreenEditorComponent implements OnInit {

  constructor(firestore: AngularFirestore) {
    debugger;
  }

  ngOnInit(): void {
  }

}
