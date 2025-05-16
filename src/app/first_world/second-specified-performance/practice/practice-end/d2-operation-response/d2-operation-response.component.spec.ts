import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2OperationResponseComponent } from './d2-operation-response.component';

describe('D2OperationResponseComponent', () => {
  let component: D2OperationResponseComponent;
  let fixture: ComponentFixture<D2OperationResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D2OperationResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D2OperationResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
