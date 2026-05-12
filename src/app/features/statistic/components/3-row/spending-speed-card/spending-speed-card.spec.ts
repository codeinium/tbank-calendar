import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingSpeedCard } from './spending-speed-card';

describe('SpendingSpeedCard', () => {
  let component: SpendingSpeedCard;
  let fixture: ComponentFixture<SpendingSpeedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendingSpeedCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SpendingSpeedCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
