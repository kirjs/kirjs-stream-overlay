import { TestBed } from '@angular/core/testing';

import { HighlightsService } from './highlights.service';

describe('HighlightsService', () => {
  let service: HighlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
