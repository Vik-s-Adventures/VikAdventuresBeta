import { TestBed } from '@angular/core/testing';

import { PlayerFinalBattleService } from './player-final-battle.service';

describe('PlayerFinalBattleService', () => {
  let service: PlayerFinalBattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerFinalBattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
