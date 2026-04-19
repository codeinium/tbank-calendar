import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsChart } from './goals-chart';

describe('GoalsChart', () => {
  let component: GoalsChart;
  let fixture: ComponentFixture<GoalsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsChart],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
