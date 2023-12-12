import { TestBed } from '@angular/core/testing';

import { TwitchIntegrationService } from './twitch-integration.service';

describe('TwitchIntegrationService', () => {
  let service: TwitchIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitchIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
