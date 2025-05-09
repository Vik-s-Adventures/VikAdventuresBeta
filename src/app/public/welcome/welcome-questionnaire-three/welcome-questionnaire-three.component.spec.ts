import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeQuestionnaireThreeComponent } from './welcome-questionnaire-three.component';

describe('WelcomeQuestionnaireThreeComponent', () => {
  let component: WelcomeQuestionnaireThreeComponent;
  let fixture: ComponentFixture<WelcomeQuestionnaireThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeQuestionnaireThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeQuestionnaireThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
