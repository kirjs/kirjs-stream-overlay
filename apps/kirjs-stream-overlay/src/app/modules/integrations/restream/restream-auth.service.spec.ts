import { TestBed } from '@angular/core/testing';
import { RestreamAuthService } from './restream-auth.service';

describe('RestreamAuthService', () => {
  let service: RestreamAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestreamAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
