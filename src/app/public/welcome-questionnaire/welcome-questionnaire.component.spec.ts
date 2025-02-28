import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeQuestionnaireComponent } from './welcome-questionnaire.component';

describe('WelcomeQuestionnaireComponent', () => {
  let component: WelcomeQuestionnaireComponent;
  let fixture: ComponentFixture<WelcomeQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeQuestionnaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
