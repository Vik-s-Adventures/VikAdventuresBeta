import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPerformanceConceptsComponent } from './two-performance-concepts.component';

describe('TwoPerformanceConceptsComponent', () => {
  let component: TwoPerformanceConceptsComponent;
  let fixture: ComponentFixture<TwoPerformanceConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoPerformanceConceptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoPerformanceConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
