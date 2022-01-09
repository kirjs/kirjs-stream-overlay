import { TestBed } from '@angular/core/testing';

import { UserIsAdminGuard } from './user-is-admin.guard';

describe('UserIsAdminGuard', () => {
  let guard: UserIsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserIsAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
