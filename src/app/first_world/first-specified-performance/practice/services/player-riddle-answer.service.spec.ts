import { TestBed } from '@angular/core/testing';

import { PlayerRiddleAnswerService } from './player-riddle-answer.service';

describe('PlayerRiddleAnswerService', () => {
  let service: PlayerRiddleAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerRiddleAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
