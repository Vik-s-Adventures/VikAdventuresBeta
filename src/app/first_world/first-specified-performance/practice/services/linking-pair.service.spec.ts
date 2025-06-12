import { TestBed } from '@angular/core/testing';

import { LinkingPairService } from './linking-pair.service';

describe('LinkingPairService', () => {
  let service: LinkingPairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkingPairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
