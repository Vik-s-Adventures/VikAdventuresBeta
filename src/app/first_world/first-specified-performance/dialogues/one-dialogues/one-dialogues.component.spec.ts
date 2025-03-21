import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDialoguesComponent } from './one-dialogues.component';

describe('OneDialoguesComponent', () => {
  let component: OneDialoguesComponent;
  let fixture: ComponentFixture<OneDialoguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneDialoguesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneDialoguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
