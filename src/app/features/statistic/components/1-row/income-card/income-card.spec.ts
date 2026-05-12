import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCard } from './income-card';

describe('IncomeCard', () => {
  let component: IncomeCard;
  let fixture: ComponentFixture<IncomeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
