import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeQuestionnaireFourComponent } from './welcome.questionnaire-four.component';

describe('WelcomeQuestionnaireFourComponent', () => {
  let component: WelcomeQuestionnaireFourComponent;
  let fixture: ComponentFixture<WelcomeQuestionnaireFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeQuestionnaireFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeQuestionnaireFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
