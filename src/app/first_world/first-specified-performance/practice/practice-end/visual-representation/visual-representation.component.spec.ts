import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualRepresentationComponent } from './visual-representation.component';

describe('VisualRepresentationComponent', () => {
  let component: VisualRepresentationComponent;
  let fixture: ComponentFixture<VisualRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualRepresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
