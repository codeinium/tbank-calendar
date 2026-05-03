import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsContainer } from './subscriptions-container';

describe('SubscriptionsContainer', () => {
  let component: SubscriptionsContainer;
  let fixture: ComponentFixture<SubscriptionsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionsContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
