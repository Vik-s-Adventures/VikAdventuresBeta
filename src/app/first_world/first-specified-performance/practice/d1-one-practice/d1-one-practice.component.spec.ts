import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D1OnePracticeComponent } from './d1-one-practice.component';

describe('D1OnePracticeComponent', () => {
  let component: D1OnePracticeComponent;
  let fixture: ComponentFixture<D1OnePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D1OnePracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D1OnePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
