import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2ThreePracticeComponent } from './d2-three-practice.component';

describe('D2ThreePracticeComponent', () => {
  let component: D2ThreePracticeComponent;
  let fixture: ComponentFixture<D2ThreePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D2ThreePracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D2ThreePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
