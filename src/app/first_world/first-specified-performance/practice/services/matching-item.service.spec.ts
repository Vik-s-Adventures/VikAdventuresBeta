import { TestBed } from '@angular/core/testing';

import { MatchingItemService } from './matching-item.service';

describe('MatchingItemService', () => {
  let service: MatchingItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchingItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
