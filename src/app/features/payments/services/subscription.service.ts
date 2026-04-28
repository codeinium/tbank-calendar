import { inject, Injectable } from '@angular/core';
import { SubscriptionStore } from './subscription.store';
import { SortDirection, SortName } from '../types/type';

@Injectable()
export class SubscriptionService {
  private subscriptionStore = inject(SubscriptionStore);

  load() {
    this.subscriptionStore.loadSubscriptions();
  }

  subscriptions = this.subscriptionStore.sortedSubscriptions;
  loading = this.subscriptionStore.loadingSubscriptions();

  monthlyTotal = this.subscriptionStore.monthlyTotal;
  yearlyTotal = this.subscriptionStore.yearlyTotal;
  activeCount = this.subscriptionStore.activeCount;

  upcomingSubscriptions = this.subscriptionStore.upcomingSubscriptions;
  upcomingCount = this.subscriptionStore.upcomingCount;

  setSort(type: SortName) {
    this.subscriptionStore.setSortBy(type);
  }

  setDir(type: SortDirection) {
    this.subscriptionStore.setSortDir(type);
  }

  setSearch(value: string) {
    this.subscriptionStore.setSearch(value);
  }

  categories = this.subscriptionStore.categories;

  setCategory(category: string | null) {
    this.subscriptionStore.setCategory(category);
  }
}
