import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsHeader } from './stats-header';

describe('StatsHeader', () => {
  let component: StatsHeader;
  let fixture: ComponentFixture<StatsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
