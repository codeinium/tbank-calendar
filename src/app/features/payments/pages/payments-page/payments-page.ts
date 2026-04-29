import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaymentsContainer } from '../../components/payments-container/payments-container';
import { SubscriptionsContainer } from '../../components/subscriptions-container/subscriptions-container';
import { SubscriptionStore } from '../../stores/subscription.store';
import { ScheduledPaymentStore } from '../../stores/scheduled-payment.store';
import { SubscriptionService } from '../../services/subscription.service';
import { ScheduledPaymentService } from '../../services/scheduled-payment.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-payments-page',
  imports: [PaymentsContainer, SubscriptionsContainer, TuiButton],
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

  ngOnInit() {
    this.subscriptionService.load();
    this.scheduledPaymentService.load();
  }
}
