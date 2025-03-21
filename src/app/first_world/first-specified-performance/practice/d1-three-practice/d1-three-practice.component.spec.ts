import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D1ThreePracticeComponent } from './d1-three-practice.component';

describe('D1ThreePracticeComponent', () => {
  let component: D1ThreePracticeComponent;
  let fixture: ComponentFixture<D1ThreePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D1ThreePracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D1ThreePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
