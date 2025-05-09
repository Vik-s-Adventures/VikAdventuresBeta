import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardsQuestionnaireAccessGuard } from './guards-questionnaire-access.guard';

describe('guardsQuestionnaireAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardsQuestionnaireAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
