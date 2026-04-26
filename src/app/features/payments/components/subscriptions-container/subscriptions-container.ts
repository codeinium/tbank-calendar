import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiItemsWithMore } from '@taiga-ui/kit';
import { TuiSearch } from '@taiga-ui/layout';

@Component({
  selector: 'app-subscriptions-container',
  imports: [TuiItemsWithMore, TuiTextfield],
  templateUrl: './subscriptions-container.html',
  styleUrl: './subscriptions-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsContainer {}
