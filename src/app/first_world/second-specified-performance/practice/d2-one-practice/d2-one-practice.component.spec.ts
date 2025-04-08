import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2OnePracticeComponent } from './d2-one-practice.component';

describe('D2OnePracticeComponent', () => {
  let component: D2OnePracticeComponent;
  let fixture: ComponentFixture<D2OnePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D2OnePracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D2OnePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
