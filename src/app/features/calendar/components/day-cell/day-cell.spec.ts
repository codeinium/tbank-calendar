import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCell } from './day-cell';

describe('DayCell', () => {
  let component: DayCell;
  let fixture: ComponentFixture<DayCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayCell],
    }).compileComponents();

    fixture = TestBed.createComponent(DayCell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
