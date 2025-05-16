import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2VisualRepresentationComponent } from './d2-visual-representation.component';

describe('D2VisualRepresentationComponent', () => {
  let component: D2VisualRepresentationComponent;
  let fixture: ComponentFixture<D2VisualRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D2VisualRepresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D2VisualRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
