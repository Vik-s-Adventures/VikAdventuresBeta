import { TestBed } from '@angular/core/testing';

import { ObstacleOptionService } from './obstacle-option.service';

describe('ObstacleOptionService', () => {
  let service: ObstacleOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObstacleOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
