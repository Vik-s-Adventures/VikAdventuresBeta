import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMap3Component } from './ranking-map3.component';

describe('RankingMap3Component', () => {
  let component: RankingMap3Component;
  let fixture: ComponentFixture<RankingMap3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingMap3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingMap3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
