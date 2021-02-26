import {Component, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({top: 100}),
        animate('200ms', style({top: 0}))
      ]),
      transition('* => void', [
        style({opacity: 0.8}),
        animate('300ms', style({
          top: -100,
          opacity: 0,
        })),

      ])
    ])
  ]
})
export class BarComponent  {
  readonly messages = [
    '🏴󠁧󠁢󠁥󠁮󠁧󠁿 🇷🇺 I stream in English, but I speak Russian! Feel free to ask questions in Russian',
    'Follow us on Clubhouse: @thekiba, @kirjs',
  ];

  readonly selectedSlide$ = interval(15000).pipe(
    startWith(0),
    map(i => i % this.messages.length));
}
