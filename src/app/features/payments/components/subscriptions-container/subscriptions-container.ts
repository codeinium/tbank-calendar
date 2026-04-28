import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiItemsWithMore } from '@taiga-ui/kit';
import { TuiSearch } from '@taiga-ui/layout';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscriptions-container',
  imports: [TuiItemsWithMore, TuiTextfield],
  templateUrl: './subscriptions-container.html',
  styleUrl: './subscriptions-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsContainer {
  service = inject(SubscriptionService);

  readonly monthlyTotal = this.service.monthlyTotal;
  readonly yearlyTotal = this.service.yearlyTotal;
  readonly activeCount = this.service.activeCount;
  readonly upcomingCount = this.service.upcomingCount;
  readonly upcomingSubscriptions = this.service.upcomingSubscriptions;
}
