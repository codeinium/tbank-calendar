import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCalendarView } from './base-calendar-view';

describe('BaseCalendarView', () => {
  let component: BaseCalendarView;
  let fixture: ComponentFixture<BaseCalendarView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCalendarView],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseCalendarView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
