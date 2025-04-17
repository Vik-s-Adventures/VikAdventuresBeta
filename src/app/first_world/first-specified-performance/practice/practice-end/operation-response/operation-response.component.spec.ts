import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationResponseComponent } from './operation-response.component';

describe('OperationResponseComponent', () => {
  let component: OperationResponseComponent;
  let fixture: ComponentFixture<OperationResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
