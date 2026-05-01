import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriptionForm } from './create-subscription-form';

describe('CreateSubscriptionForm', () => {
  let component: CreateSubscriptionForm;
  let fixture: ComponentFixture<CreateSubscriptionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubscriptionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSubscriptionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
