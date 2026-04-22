import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPayContainer } from './auto-pay-container';

describe('AutoPayContainer', () => {
  let component: AutoPayContainer;
  let fixture: ComponentFixture<AutoPayContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoPayContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoPayContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
