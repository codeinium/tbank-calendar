import { inject, Injectable } from '@angular/core';
import { SubscriptionStore } from '../stores/subscription.store';

@Injectable()
export class SubscriptionService {
  private store = inject(SubscriptionStore);

  load() {
    this.store.load();
  }

  subscriptions = this.store.sorted;
  loading = this.store.loading;

  monthlyTotal = this.store.monthlyTotal;
  yearlyTotal = this.store.yearlyTotal;
  activeCount = this.store.activeCount;

  upcomingSubscriptions = this.store.upcomingSubscriptions;
  upcomingCount = this.store.upcomingCount;

  categories = this.store.categories;

  setSort(type: string) {
    this.store.setSortBy(type);
  }

  setDir(dir: 'asc' | 'desc') {
    this.store.setSortDir(dir);
  }

  setSearch(value: string) {
    this.store.setSearch(value);
  }

  setCategory(category: string | null) {
    this.store.setCategory(category);
  }
}
