import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePerformanceEvaluationComponent } from './one-performance-evaluation.component';

describe('OnePerformanceEvaluationComponent', () => {
  let component: OnePerformanceEvaluationComponent;
  let fixture: ComponentFixture<OnePerformanceEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnePerformanceEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnePerformanceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
