/* eslint-disable prettier/prettier */
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import OpenAI from 'openai';
import { TokensService } from '../../api-keys/tokens.service';
import { map, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { UIStream } from '../types';

@Component({
  selector: 'app-youtube-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtube-preview.component.html',
  styleUrls: ['./youtube-preview.component.css'],
})
export class YoutubePreviewComponent {
  private readonly tokenService = inject(TokensService);
  readonly apiKey$ = this.tokenService.getToken('openApiKey');

  @Input() stream!: UIStream;
  @Input() previewPrompt!: string | null;
  readonly openAi$ = this.apiKey$.pipe(
    map(apiKey => {
      return new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    }),
    shareReplay(1),
  );
  protected readonly generateImageSubject = new Subject();
  protected readonly youtubePreview$ = this.generateImageSubject.pipe(
    switchMapTo(this.openAi$),
    switchMap(openai => {
      console.log('start generating', this.previewPrompt);
      if (this.previewPrompt == null) {
        return EMPTY;
      }

      return openai.images.generate({
        model: 'dall-e-3',
        prompt: this.previewPrompt,
        n: 1,
        size: '1792x1024',
      });
    }),
    map(result => {
      debugger;
      return result.data[0].url;
    }),
  );

  ngOnInit() {}
}
