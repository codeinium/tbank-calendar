import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayModal } from './day-modal';

describe('DayModal', () => {
  let component: DayModal;
  let fixture: ComponentFixture<DayModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DayModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
