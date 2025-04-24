import { TestBed } from '@angular/core/testing';

import { ProfileResponseService } from './profile-response.service';

describe('ProfileResponseService', () => {
  let service: ProfileResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
