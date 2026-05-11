import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardSkeleton } from './summary-card-skeleton';

describe('SummaryCardSkeleton', () => {
  let component: SummaryCardSkeleton;
  let fixture: ComponentFixture<SummaryCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
