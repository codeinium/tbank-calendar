import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaymentsContainer } from '../../components/payments-container/payments-container';
import { SubscriptionsContainer } from '../../components/subscriptions-container/subscriptions-container';
import { SubscriptionStore } from '../../stores/subscription.store';
import { SheduledPaymentStore } from '../../stores/sheduled-payment.store';
import { SubscriptionService } from '../../services/subscription.service';
import { SheduledPaymentService } from '../../services/sheduled-payment.service';

@Component({
  selector: 'app-payments-page',
  imports: [PaymentsContainer, SubscriptionsContainer],
  templateUrl: './payments-page.html',
  styleUrl: './payments-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SubscriptionStore, SheduledPaymentStore, SubscriptionService, SheduledPaymentService],
})
export class PaymentsPage {
  subscriptionService = inject(SubscriptionService);
  sheduledPaymentService = inject(SheduledPaymentService);

  ngOnInit() {
    this.subscriptionService.load();
    this.sheduledPaymentService.load();
  }
}
