import { TestBed } from '@angular/core/testing';
import { LapteuhService } from './lapteuh.service';

describe('GuestService', () => {
  let service: LapteuhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LapteuhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
