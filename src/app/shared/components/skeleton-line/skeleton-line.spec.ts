import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLine } from './skeleton-line';

describe('SkeletonLine', () => {
  let component: SkeletonLine;
  let fixture: ComponentFixture<SkeletonLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonLine],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
