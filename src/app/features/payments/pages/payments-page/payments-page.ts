import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PaymentsContainer } from '../../components/payments-container/payments-container';
import { SubscriptionsContainer } from '../../components/subscriptions-container/subscriptions-container';
import { SubscriptionStore } from '../../stores/subscription.store';
import { ScheduledPaymentStore } from '../../stores/scheduled-payment.store';
import { SubscriptionService } from '../../services/subscription.service';
import { ScheduledPaymentService } from '../../services/scheduled-payment.service';
import { TuiButton } from '@taiga-ui/core';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import { CreateSubscriptionForm } from '../../forms/create-subscription-form/create-subscription-form';
import { CreateScheduledPaymentForm } from "../../forms/create-scheduled-payment-form/create-scheduled-payment-form";

@Component({
  selector: 'app-payments-page',
  imports: [
    PaymentsContainer,
    SubscriptionsContainer,
    TuiButton,
    ModalDialog,
    CreateSubscriptionForm,
    CreateScheduledPaymentForm
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
export class PaymentsPage {
  subscriptionService = inject(SubscriptionService);
  scheduledPaymentService = inject(ScheduledPaymentService);

  readonly isCreateSubscribeModalOpen = signal(false);

  openCreateSubscribeModal() {
    this.isCreateSubscribeModalOpen.set(true);
  }

  closeCreateSubscribeModal() {
    this.isCreateSubscribeModalOpen.set(false);
  }

  readonly isCreateScheduledPaymentModalOpen = signal(false);

  openCreateScheduledPaymentModal() {
    this.isCreateScheduledPaymentModalOpen.set(true);
  }

  closeCreateScheduledPaymentModal() {
    this.isCreateScheduledPaymentModalOpen.set(false);
  }

  ngOnInit() {
    this.subscriptionService.load();
    this.scheduledPaymentService.load();
  }
}
