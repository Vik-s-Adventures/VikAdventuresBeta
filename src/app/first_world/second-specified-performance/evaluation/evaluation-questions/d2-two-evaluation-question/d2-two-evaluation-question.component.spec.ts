import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2TwoEvaluationQuestionComponent } from './d2-two-evaluation-question.component';

describe('D2TwoEvaluationQuestionComponent', () => {
  let component: D2TwoEvaluationQuestionComponent;
  let fixture: ComponentFixture<D2TwoEvaluationQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D2TwoEvaluationQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D2TwoEvaluationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
