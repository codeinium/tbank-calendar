import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLine } from './chart-line';

describe('ChartLine', () => {
  let component: ChartLine;
  let fixture: ComponentFixture<ChartLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartLine],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
