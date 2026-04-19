import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsProgressBar } from './goals-progress-bar';

describe('GoalsProgressBar', () => {
  let component: GoalsProgressBar;
  let fixture: ComponentFixture<GoalsProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsProgressBar],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsProgressBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
