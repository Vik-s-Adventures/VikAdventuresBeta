import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2OneEvaluationQuestionComponent } from './d2-one-evaluation-question.component';

describe('D2OneEvaluationQuestionComponent', () => {
  let component: D2OneEvaluationQuestionComponent;
  let fixture: ComponentFixture<D2OneEvaluationQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D2OneEvaluationQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D2OneEvaluationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
