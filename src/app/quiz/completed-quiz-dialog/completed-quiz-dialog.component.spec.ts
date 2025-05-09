import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedQuizDialogComponent } from './completed-quiz-dialog.component';

describe('CompletedQuizDialogComponent', () => {
  let component: CompletedQuizDialogComponent;
  let fixture: ComponentFixture<CompletedQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedQuizDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
