import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { StreamConfigService } from '../stream-manager/stream-config.service';
import { normalizeSpaces, unescapeLapteuhMarkdown } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class HighlightsService {
  constructor(readonly streamConfigService: StreamConfigService) {}

  readonly highlightsHtml$ = this.streamConfigService.currentStream$.pipe(
    filter(stream => !!stream),
    map(stream => {
      return stream?.highlights.split('\n') ?? [];
    }),
  );

  readonly highlights$ = this.highlightsHtml$.pipe(
    map(highlights => {
      return unescapeLapteuhMarkdown(normalizeSpaces(highlights.join('')))
        .replaceAll(/\n\n/g, '\n')
        .split('\n');
    }),
  );
}
