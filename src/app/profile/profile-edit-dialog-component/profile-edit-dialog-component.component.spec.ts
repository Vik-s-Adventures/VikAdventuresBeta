import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditDialogComponentComponent } from './profile-edit-dialog-component.component';

describe('ProfileEditDialogComponentComponent', () => {
  let component: ProfileEditDialogComponentComponent;
  let fixture: ComponentFixture<ProfileEditDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
