import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsInfSceleton } from './goals-info-skeleton';

describe('GoalsInfSceleton', () => {
  let component: GoalsInfSceleton;
  let fixture: ComponentFixture<GoalsInfSceleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsInfSceleton],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsInfSceleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
