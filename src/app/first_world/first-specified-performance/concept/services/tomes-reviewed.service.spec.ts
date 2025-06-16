import { TestBed } from '@angular/core/testing';

import { TomesReviewedService } from './tomes-reviewed.service';

describe('TomesReviewedService', () => {
  let service: TomesReviewedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TomesReviewedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
