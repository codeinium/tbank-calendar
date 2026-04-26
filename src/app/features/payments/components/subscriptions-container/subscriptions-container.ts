import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiItemsWithMore } from '@taiga-ui/kit';


@Component({
  selector: 'app-subscriptions-container',
  imports: [],
  templateUrl: './subscriptions-container.html',
  styleUrl: './subscriptions-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsContainer {}
