import { TestBed } from '@angular/core/testing';

import { FinalBattleService } from './final-battle.service';

describe('FinalBattleService', () => {
  let service: FinalBattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalBattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
