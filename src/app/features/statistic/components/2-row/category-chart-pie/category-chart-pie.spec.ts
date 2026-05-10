import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChartPie } from './category-chart-pie';

describe('CategoryChartPie', () => {
  let component: CategoryChartPie;
  let fixture: ComponentFixture<CategoryChartPie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryChartPie],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryChartPie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
