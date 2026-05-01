import { inject, Injectable } from '@angular/core';
import { SubscriptionStore } from '../stores/subscription.store';
import { CreateSubscriptionRequest } from '@/app/models/subscription/subscription.model';

@Injectable()
export class SubscriptionService {
  private store = inject(SubscriptionStore);

  load() {
    this.store.load();
  }

  create(request: CreateSubscriptionRequest) {
    this.store.create(request);
  }

  subscriptions = this.store.sorted;
  loading = this.store.loading;

  monthlyTotal = this.store.monthlyTotal;
  yearlyTotal = this.store.yearlyTotal;
  activeCount = this.store.activeCount;

  upcomingSubscriptions = this.store.upcomingSubscriptions;
  upcomingCount = this.store.upcomingCount;

  categories = this.store.categories;

  setSortOption(value: string) {
    const [type, dir] = value.split('-') as [string, 'asc' | 'desc'];
    this.store.setSortBy(type);
    this.store.setSortDir(dir);
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
