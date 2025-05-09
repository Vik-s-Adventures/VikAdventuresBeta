import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAdvanceComponent } from './progress-advance.component';

describe('ProgressAdvanceComponent', () => {
  let component: ProgressAdvanceComponent;
  let fixture: ComponentFixture<ProgressAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressAdvanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
