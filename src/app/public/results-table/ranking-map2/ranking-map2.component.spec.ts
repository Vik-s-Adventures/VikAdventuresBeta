import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMap2Component } from './ranking-map2.component';

describe('RankingMap2Component', () => {
  let component: RankingMap2Component;
  let fixture: ComponentFixture<RankingMap2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingMap2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingMap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
