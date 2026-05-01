import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScheduledPaymentForm } from './create-scheduled-payment-form';

describe('CreateScheduledPaymentForm', () => {
  let component: CreateScheduledPaymentForm;
  let fixture: ComponentFixture<CreateScheduledPaymentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateScheduledPaymentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateScheduledPaymentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
