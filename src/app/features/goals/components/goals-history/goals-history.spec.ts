import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsHistory } from './goals-history';

describe('GoalsHistory', () => {
  let component: GoalsHistory;
  let fixture: ComponentFixture<GoalsHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
