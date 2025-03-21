import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D1OneEvaluationQuestionComponent } from './d1-one-evaluation-question.component';

describe('D1OneEvaluationQuestionComponent', () => {
  let component: D1OneEvaluationQuestionComponent;
  let fixture: ComponentFixture<D1OneEvaluationQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D1OneEvaluationQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D1OneEvaluationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
