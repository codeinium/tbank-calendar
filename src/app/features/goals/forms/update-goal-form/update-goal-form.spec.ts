import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGoalForm } from './update-goal-form';

describe('UpdateGoalForm', () => {
  let component: UpdateGoalForm;
  let fixture: ComponentFixture<UpdateGoalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGoalForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateGoalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
