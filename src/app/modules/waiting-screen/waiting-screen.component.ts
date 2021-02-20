import {Component, HostBinding, OnInit} from '@angular/core';


const colors = [
  '#ba0000',
  '#1e98ea',
  '#1f7f43',
];

const color = colors[Math.floor(Math.random() * colors.length)];


@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.scss']
})
export class WaitingScreenComponent implements OnInit {
  @HostBinding('style.background-color')
  readonly color = color;
  size: any;


  ngOnInit(): void {
  }

}
