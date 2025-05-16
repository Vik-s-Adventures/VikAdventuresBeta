import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2DataIdentificationComponent } from './d2-data-identification.component';

describe('D2DataIdentificationComponent', () => {
  let component: D2DataIdentificationComponent;
  let fixture: ComponentFixture<D2DataIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D2DataIdentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D2DataIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
