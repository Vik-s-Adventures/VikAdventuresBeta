import { TestBed } from '@angular/core/testing';

import { StudentResponseService } from './student-response.service';

describe('StudentResponseService', () => {
  let service: StudentResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
