import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsSidebar } from './goals-sidebar';

describe('GoalsSidebar', () => {
  let component: GoalsSidebar;
  let fixture: ComponentFixture<GoalsSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
