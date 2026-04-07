import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsInfoContainer } from './goals-info-container';

describe('GoalsInfoContainer', () => {
  let component: GoalsInfoContainer;
  let fixture: ComponentFixture<GoalsInfoContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsInfoContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsInfoContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
