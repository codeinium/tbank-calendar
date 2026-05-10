import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsStatCard } from './goals-stat-card';

describe('GoalsStatCard', () => {
  let component: GoalsStatCard;
  let fixture: ComponentFixture<GoalsStatCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsStatCard],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsStatCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
