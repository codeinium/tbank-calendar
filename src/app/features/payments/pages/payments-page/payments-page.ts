import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentsContainer } from '../../components/payments-container/payments-container';
import { SubscriptionsContainer } from '../../components/subscriptions-container/subscriptions-container';

@Component({
  selector: 'app-payments-page',
  imports: [PaymentsContainer, SubscriptionsContainer],
  templateUrl: './payments-page.html',
  styleUrl: './payments-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPage {}
