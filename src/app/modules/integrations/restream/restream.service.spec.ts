import { TestBed } from '@angular/core/testing';

import { RestreamService } from './restream.service';

describe('RestreamService', () => {
  let service: RestreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
