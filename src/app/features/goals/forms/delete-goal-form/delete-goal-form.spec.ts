import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGoalForm } from './delete-goal-form';

describe('DeleteGoalForm', () => {
  let component: DeleteGoalForm;
  let fixture: ComponentFixture<DeleteGoalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGoalForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteGoalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
