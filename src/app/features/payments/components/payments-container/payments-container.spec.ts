import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsContainer } from './payments-container';

describe('PaymentsContainer', () => {
  let component: PaymentsContainer;
  let fixture: ComponentFixture<PaymentsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
