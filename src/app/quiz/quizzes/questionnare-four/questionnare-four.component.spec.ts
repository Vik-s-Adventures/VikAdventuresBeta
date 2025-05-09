import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnareFourComponent } from './questionnare-four.component';

describe('QuestionnareFourComponent', () => {
  let component: QuestionnareFourComponent;
  let fixture: ComponentFixture<QuestionnareFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionnareFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnareFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
