import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataIdentificationComponent } from './data-identification.component';

describe('DataIdentificationComponent', () => {
  let component: DataIdentificationComponent;
  let fixture: ComponentFixture<DataIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataIdentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
