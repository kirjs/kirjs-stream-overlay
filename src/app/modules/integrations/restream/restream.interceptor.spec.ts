import { TestBed } from '@angular/core/testing';
import { RestreamInterceptor } from './restream.interceptor';

describe('RestreamInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RestreamInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: RestreamInterceptor = TestBed.inject(
      RestreamInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
