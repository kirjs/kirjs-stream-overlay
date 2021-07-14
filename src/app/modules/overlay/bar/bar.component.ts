import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { combineLatest, interval } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { StreamConfigService } from '../../admin/stream-manager/stream-config.service';

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
})
export class BarComponent {
  constructor(readonly waitingService: StreamConfigService) {}

  readonly highlights$ = this.waitingService.currentStream$.pipe(
    filter(stream => !!stream),
    map(stream => {
      return stream?.highlights.split('\n') ?? [];
    }),
  );

  private readonly interval$ = interval(15000).pipe(startWith(0));

  readonly selectedSlide$ = combineLatest([
    this.interval$,
    this.highlights$,
  ]).pipe(
    map(([index, messages]) => {
      return index % messages.length;
    }),
  );
}
