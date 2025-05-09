import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMap4Component } from './ranking-map4.component';

describe('RankingMap4Component', () => {
  let component: RankingMap4Component;
  let fixture: ComponentFixture<RankingMap4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingMap4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingMap4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
