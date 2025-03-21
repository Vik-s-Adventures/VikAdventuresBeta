import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePerformanceConceptsComponent } from './one-performance-concepts.component';

describe('OnePerformanceConceptsComponent', () => {
  let component: OnePerformanceConceptsComponent;
  let fixture: ComponentFixture<OnePerformanceConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnePerformanceConceptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnePerformanceConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
