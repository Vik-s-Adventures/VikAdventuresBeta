import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnareThreeComponent } from './questionnare-three.component';

describe('QuestionnareThreeComponent', () => {
  let component: QuestionnareThreeComponent;
  let fixture: ComponentFixture<QuestionnareThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionnareThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnareThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
