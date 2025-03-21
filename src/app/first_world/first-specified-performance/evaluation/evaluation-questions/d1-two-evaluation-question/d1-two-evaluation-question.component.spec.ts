import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D1TwoEvaluationQuestionComponent } from './d1-two-evaluation-question.component';

describe('D1TwoEvaluationQuestionComponent', () => {
  let component: D1TwoEvaluationQuestionComponent;
  let fixture: ComponentFixture<D1TwoEvaluationQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D1TwoEvaluationQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D1TwoEvaluationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
