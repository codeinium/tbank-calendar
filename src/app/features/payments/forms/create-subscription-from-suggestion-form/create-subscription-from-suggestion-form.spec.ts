import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriptionFromSuggestionForm } from './create-subscription-from-suggestion-form';

describe('CreateSubscriptionFromSuggestionForm', () => {
  let component: CreateSubscriptionFromSuggestionForm;
  let fixture: ComponentFixture<CreateSubscriptionFromSuggestionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubscriptionFromSuggestionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSubscriptionFromSuggestionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
