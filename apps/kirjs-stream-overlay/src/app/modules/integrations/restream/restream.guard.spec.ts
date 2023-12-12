import { TestBed } from '@angular/core/testing';
import { RestreamGuard } from './restream.guard';

describe('RestreamGuard', () => {
  let guard: RestreamGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RestreamGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
