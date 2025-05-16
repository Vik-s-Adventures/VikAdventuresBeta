import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPerformanceEvaluationComponent } from './two-performance-evaluation.component';

describe('TwoPerformanceEvaluationComponent', () => {
  let component: TwoPerformanceEvaluationComponent;
  let fixture: ComponentFixture<TwoPerformanceEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoPerformanceEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoPerformanceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
