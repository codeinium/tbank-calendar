import { inject, Injectable } from '@angular/core';
import { SubscriptionStore } from '../stores/subscription.store';
import {
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
} from '@/app/models/subscription/subscription.model';
import { ReminderPaymentService } from '@/app/services/reminder-payment/reminder-payment.service';
import { take } from 'rxjs';

@Injectable()
export class SubscriptionService {
  private store = inject(SubscriptionStore);
  private api = inject(ReminderPaymentService);

  subscriptions = this.store.sorted;
  loading = this.store.loading;
  error = this.store.error;

  monthlyTotal = this.store.monthlyTotal;
  yearlyTotal = this.store.yearlyTotal;
  activeCount = this.store.activeCount;

  upcomingSubscriptions = this.store.upcomingSubscriptions;
  upcomingCount = this.store.upcomingCount;

  categories = this.store.categories;

  load() {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .getSubsriptions()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.store.setItems(data);
          this.store.setLoading(false);
        },
        error: (err) => {
          this.store.setError(err.message);
          this.store.setLoading(false);
        },
      });
  }

  create(request: CreateSubscriptionRequest, onSuccess?: () => void) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .createSubscription(request)
      .pipe(take(1))
      .subscribe({
        next: (created) => {
          this.store.addItem(created);
          this.store.setLoading(false);
          onSuccess?.();
        },
        error: (err) => {
          this.store.setError(err.message);
          this.store.setLoading(false);
        },
      });
  }

  update(id: string, request: UpdateSubscriptionRequest) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .updateSubscription(id, request)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          if (updated) {
            this.store.updateItem(id, updated);
          }

          this.store.setLoading(false);
        },
        error: (err) => {
          this.store.setError(err.message);
          this.store.setLoading(false);
        },
      });
  }

  delete(id: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .deleteSubscription(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.store.removeItem(id);
          this.store.setLoading(false);
        },
        error: (err) => {
          this.store.setError(err.message);
          this.store.setLoading(false);
        },
      });
  }

  pause(id: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .pauseSubscription(id)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          if (updated) {
            this.store.updateItem(id, updated);
          }

          this.store.setLoading(false);
        },
        error: (err) => {
          this.store.setError(err.message);
          this.store.setLoading(false);
        },
      });
  }

  resume(id: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .resumeSubscription(id)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          if (updated) {
            this.store.updateItem(id, updated);
          }

          this.store.setLoading(false);
        },
        error: (err) => {
          this.store.setError(err.message);
          this.store.setLoading(false);
        },
      });
  }

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
