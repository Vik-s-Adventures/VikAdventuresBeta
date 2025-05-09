import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeQuestionnaireTwoComponent } from './welcome-questionnaire-two.component';

describe('WelcomeQuestionnaireTwoComponent', () => {
  let component: WelcomeQuestionnaireTwoComponent;
  let fixture: ComponentFixture<WelcomeQuestionnaireTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeQuestionnaireTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeQuestionnaireTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
