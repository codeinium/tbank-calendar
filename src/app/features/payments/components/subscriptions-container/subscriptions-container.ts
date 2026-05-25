import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiItemsWithMore } from '@taiga-ui/kit';
import { TuiSearch } from '@taiga-ui/layout';
import { SubscriptionService } from '../../services/subscription.service';
import { StatsCard } from "../stats-card/stats-card";
import { UpdateSubForm } from "../../forms/update-sub-form/update-sub-form";
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import {
  Subscription,
  UpdateSubscriptionRequest,
} from '@/app/models/subscription/subscription.model';

@Component({
  selector: 'app-subscriptions-container',
  imports: [TuiItemsWithMore, TuiTextfield, StatsCard, UpdateSubForm, ModalDialog],
  templateUrl: './subscriptions-container.html',
  styleUrl: './subscriptions-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsContainer {
  subscriptionService = inject(SubscriptionService);
  readonly isUpdateSubscriptionModalOpen = signal(false);
  readonly updatingSubscription = signal<Subscription | null>(null);

  openEditSubscriptionModal(subscription: Subscription) {
    this.updatingSubscription.set(subscription);
    this.isUpdateSubscriptionModalOpen.set(true);
  }

  closeEditSubscriptionModal() {
    this.isUpdateSubscriptionModalOpen.set(false);
    this.updatingSubscription.set(null);
  }

  updateSubscription(request: UpdateSubscriptionRequest) {
    const subscription = this.updatingSubscription();

    if (!subscription) {
      return;
    }

    this.subscriptionService.update(subscription.id, request);
    this.closeEditSubscriptionModal();
  }
}
