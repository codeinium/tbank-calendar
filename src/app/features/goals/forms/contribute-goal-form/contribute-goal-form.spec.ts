import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeGoalForm } from './contribute-goal-form';

describe('ContributeGoalForm', () => {
  let component: ContributeGoalForm;
  let fixture: ComponentFixture<ContributeGoalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributeGoalForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ContributeGoalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
