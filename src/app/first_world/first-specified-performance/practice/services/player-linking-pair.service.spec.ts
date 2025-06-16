import { TestBed } from '@angular/core/testing';

import { PlayerLinkingPairService } from './player-linking-pair.service';

describe('PlayerLinkingPairService', () => {
  let service: PlayerLinkingPairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerLinkingPairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
