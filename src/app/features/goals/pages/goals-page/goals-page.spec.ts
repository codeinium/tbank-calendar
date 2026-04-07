import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsPageComponent } from './goals-page';

describe('GoalsPage', () => {
  let component: GoalsPageComponent;
  let fixture: ComponentFixture<GoalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
