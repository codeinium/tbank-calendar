import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiItemsWithMore } from '@taiga-ui/kit';
import { TuiSearch } from '@taiga-ui/layout';
import { SubscriptionService } from '../../services/subscription.service';
import { StatsCard } from "../stats-card/stats-card";

@Component({
  selector: 'app-subscriptions-container',
  imports: [TuiItemsWithMore, TuiTextfield, StatsCard],
  templateUrl: './subscriptions-container.html',
  styleUrl: './subscriptions-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsContainer {
  service = inject(SubscriptionService);
}
