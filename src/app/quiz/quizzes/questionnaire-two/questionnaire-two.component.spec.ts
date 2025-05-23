import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireTwoComponent } from './questionnaire-two.component';

describe('QuestionnaireTwoComponent', () => {
  let component: QuestionnaireTwoComponent;
  let fixture: ComponentFixture<QuestionnaireTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionnaireTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnaireTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
