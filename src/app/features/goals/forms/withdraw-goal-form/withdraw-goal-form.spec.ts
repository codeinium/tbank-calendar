import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawGoalForm } from './withdraw-goal-form';

describe('WithdrawGoalForm', () => {
  let component: WithdrawGoalForm;
  let fixture: ComponentFixture<WithdrawGoalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawGoalForm],
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawGoalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
