import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceletonLine } from './skeleton-line';

describe('SceletonLine', () => {
  let component: SceletonLine;
  let fixture: ComponentFixture<SceletonLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceletonLine],
    }).compileComponents();

    fixture = TestBed.createComponent(SceletonLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
