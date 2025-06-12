import { TestBed } from '@angular/core/testing';

import { RiddleDetailService } from './riddle-detail.service';

describe('RiddleDetailService', () => {
  let service: RiddleDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiddleDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
