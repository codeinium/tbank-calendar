import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStatCard } from './sub-stat-card';

describe('SubStatCard', () => {
  let component: SubStatCard;
  let fixture: ComponentFixture<SubStatCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubStatCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SubStatCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
