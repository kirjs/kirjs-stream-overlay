import { TestBed } from '@angular/core/testing';

import { TripleChatService } from './triple-chat.service';

describe('TripleChatService', () => {
  let service: TripleChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripleChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
