import { TestBed } from '@angular/core/testing';

import { AdminTokenAuthResolver } from './admin-token-auth.resolver';

describe('AdminTokenAuthResolver', () => {
  let resolver: AdminTokenAuthResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminTokenAuthResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
