import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarChart } from './calendar-chart';

describe('CalendarChart', () => {
  let component: CalendarChart;
  let fixture: ComponentFixture<CalendarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarChart],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
