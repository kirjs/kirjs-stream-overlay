import { TestBed } from '@angular/core/testing';

import { RestreamAuthServiceService } from './restream-auth.service';

describe('RestreamAuthServiceService', () => {
  let service: RestreamAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestreamAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
