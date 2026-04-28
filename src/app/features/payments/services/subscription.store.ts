import { SheduledPayment } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { Subscription } from '@/app/models/subscription/subscription.model';
import { ReminderPaymentService } from '@/app/services/reminder-payment/reminder-payment.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { take } from 'rxjs';
import { SortDirection, SortName } from '../types/type';

@Injectable()
export class SubscriptionStore {
  private apiService = inject(ReminderPaymentService);

  private readonly _subscriptions = signal<Subscription[]>([]);
  private readonly _loadingSubscriptions = signal(true);
  private readonly _error = signal<string | null>(null);

  readonly subscriptions = this._subscriptions.asReadonly();
  readonly loadingSubscriptions = this._loadingSubscriptions.asReadonly();
  readonly error = this._error.asReadonly();

  private search = signal('');
  private categoryFilter = signal<string | null>(null);
  private sortBy = signal<SortName>('date');
  private sortDir = signal<SortDirection>('asc');

  setSortBy(sortName: SortName) {
    this.sortBy.set(sortName);
  }

  setSortDir(sortName: SortDirection) {
    this.sortDir.set(sortName);
  }

  setSearch(value: string) {
    this.search.set(value);
  }

  setCategory(category: string | null) {
    this.categoryFilter.set(category);
  }

  categories = computed(() => {
    const subs = this.subscriptions();

    return [...new Set(subs.map((s) => s.categoryName))].map((c) => ({
      label: c,
      value: c,
    }));
  });

  readonly monthlyTotal = computed(() =>
    this.subscriptions().reduce((sum, s) => sum + s.amount, 0),
  );
  readonly yearlyTotal = computed(() =>
    this.subscriptions().reduce((sum, s) => {
      if (s.billingCycle === 'monthly') return sum + s.amount * 12;
      if (s.billingCycle === 'yearly') return sum + s.amount;
      return sum;
    }, 0),
  );

  readonly activeCount = computed(
    () => this.subscriptions().filter((s) => s.status === 'active').length,
  );
  readonly upcomingSubscriptions = computed(() => {
    const subs = this.subscriptions();

    const now = dayjs().startOf('day');
    const limit = now.add(3, 'day').endOf('day');

    return subs.filter((s) => {
      const date = dayjs(s.nextBillingDate);

      return date.isBetween(now, limit, null, '[]');
    });
  });
  readonly upcomingCount = computed(() => this.upcomingSubscriptions().length);

  loadSubscriptions() {
    this._loadingSubscriptions.set(true);
    this._error.set(null);
    this.apiService
      .getSubsriptions()
      .pipe(take(1))
      .subscribe({
        next: (subscription) => {
          this._subscriptions.set(subscription);
          this._loadingSubscriptions.set(false);
        },
        error: (err) => {
          this._error.set(err.message);
          this._loadingSubscriptions.set(false);
        },
      });
  }

  filteredSubscriptions = computed(() => {
    let data = this.subscriptions();

    const search = this.search();
    const category = this.categoryFilter();

    if (search) {
      data = data.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (category) {
      data = data.filter((s) => s.categoryName === category);
    }

    return data;
  });

  sortedSubscriptions = computed(() => {
    const data = this.filteredSubscriptions();
    const sortBy = this.sortBy();
    const dir = this.sortDir();

    return [...data].sort((a, b) => {
      let result = 0;

      if (sortBy === 'price') {
        result = a.amount - b.amount;
      }

      if (sortBy === 'date') {
        result = dayjs(a.nextBillingDate).diff(dayjs(b.nextBillingDate));
      }

      if (sortBy === 'name') {
        result = a.title.localeCompare(b.title);
      }

      return dir === 'asc' ? result : -result;
    });
  });
}
