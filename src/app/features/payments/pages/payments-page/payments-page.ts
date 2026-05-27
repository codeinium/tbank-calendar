import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

import { PaymentsContainer } from '../../components/payments-container/payments-container';
import { SubscriptionsContainer } from '../../components/subscriptions-container/subscriptions-container';
import { SubscriptionStore } from '../../stores/subscription.store';
import { ScheduledPaymentStore } from '../../stores/scheduled-payment.store';
import { SubscriptionService } from '../../services/subscription.service';
import { ScheduledPaymentService } from '../../services/scheduled-payment.service';

import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import { CreateSubscriptionForm } from '../../forms/create-subscription-form/create-subscription-form';
import { CreateScheduledPaymentForm } from '../../forms/create-scheduled-payment-form/create-scheduled-payment-form';
import { RecurringSuggestionsForm } from '../../forms/recurring-suggestions-form/recurring-suggestions-form';
import { CreateSubscriptionFromSuggestionForm } from '../../forms/create-subscription-from-suggestion-form/create-subscription-from-suggestion-form';

import { RecurringSuggestion } from '@/app/models/recurring-suggestion/recurring-suggestion.model';

type PaymentsModal =
  | 'create-subscription'
  | 'create-payment'
  | 'suggestions'
  | 'create-from-suggestion'
  | null;

@Component({
  selector: 'app-payments-page',
  imports: [
    PaymentsContainer,
    SubscriptionsContainer,
    TuiButton,
    ModalDialog,
    CreateSubscriptionForm,
    CreateScheduledPaymentForm,
    RecurringSuggestionsForm,
    CreateSubscriptionFromSuggestionForm,
  ],
  templateUrl: './payments-page.html',
  styleUrl: './payments-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SubscriptionStore,
    ScheduledPaymentStore,
    SubscriptionService,
    ScheduledPaymentService,
  ],
})
export class PaymentsPage implements OnInit {
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly scheduledPaymentService = inject(ScheduledPaymentService);

  readonly activeModal = signal<PaymentsModal>(null);
  readonly selectedSuggestion = signal<RecurringSuggestion | null>(null);

  ngOnInit() {
    this.subscriptionService.load();
    this.scheduledPaymentService.load();
  }

  openCreateSubscribeModal() {
    this.activeModal.set('create-subscription');
  }

  openCreateScheduledPaymentModal() {
    this.activeModal.set('create-payment');
  }

  openRecurringSuggestionsModal() {
    this.selectedSuggestion.set(null);
    this.activeModal.set('suggestions');
  }

  openCreateFromSuggestionModal(suggestion: RecurringSuggestion) {
    this.selectedSuggestion.set(suggestion);
    this.activeModal.set('create-from-suggestion');
  }

  backToSuggestions() {
    this.selectedSuggestion.set(null);
    this.activeModal.set('suggestions');
  }

  closeModal() {
    this.activeModal.set(null);
    this.selectedSuggestion.set(null);
  }

  afterSubscriptionCreated() {
    this.closeModal();
  }
}
