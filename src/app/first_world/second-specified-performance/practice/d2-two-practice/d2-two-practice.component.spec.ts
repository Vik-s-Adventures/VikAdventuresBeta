import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2TwoPracticeComponent } from './d2-two-practice.component';

describe('D2TwoPracticeComponent', () => {
  let component: D2TwoPracticeComponent;
  let fixture: ComponentFixture<D2TwoPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D2TwoPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D2TwoPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
