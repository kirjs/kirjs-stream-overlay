import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { combineLatest, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HighlightsService } from '../../admin/services/highlights.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ top: 100 }),
        animate('200ms', style({ top: 0 })),
      ]),
      transition('* => void', [
        style({ opacity: 0.8 }),
        animate(
          '300ms',
          style({
            top: -100,
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
})
export class BarComponent {
  readonly highlights$ = this.highlightsService.highlightsHtml$;
  private readonly interval$ = interval(15000).pipe(startWith(0));
  readonly selectedSlide$ = combineLatest([
    this.interval$,
    this.highlights$,
  ]).pipe(
    map(([index, messages]) => {
      return index % messages.length;
    }),
  );

  constructor(readonly highlightsService: HighlightsService) {}
}
