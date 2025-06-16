import { TestBed } from '@angular/core/testing';

import { PlayerMatchingPairService } from './player-matching-pair.service';

describe('PlayerMatchingPairService', () => {
  let service: PlayerMatchingPairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerMatchingPairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
