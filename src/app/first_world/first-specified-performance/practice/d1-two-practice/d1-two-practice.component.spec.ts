import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D1TwoPracticeComponent } from './d1-two-practice.component';

describe('D1TwoPracticeComponent', () => {
  let component: D1TwoPracticeComponent;
  let fixture: ComponentFixture<D1TwoPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D1TwoPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D1TwoPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
