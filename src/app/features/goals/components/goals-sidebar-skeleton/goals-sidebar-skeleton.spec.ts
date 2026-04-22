import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsSidebarSkeleton } from './goals-sidebar-skeleton';

describe('GoalsSidebarSkeleton', () => {
  let component: GoalsSidebarSkeleton;
  let fixture: ComponentFixture<GoalsSidebarSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsSidebarSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsSidebarSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
