import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsInfoSkeleton } from './goals-info-skeleton';

describe('GoalsInfoSkeleton', () => {
  let component: GoalsInfoSkeleton;
  let fixture: ComponentFixture<GoalsInfoSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsInfoSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsInfoSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
