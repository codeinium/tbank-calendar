import { Injectable, inject, computed, signal } from '@angular/core';
import { BaseListStore } from './base-list.store';
import { CreateSubscriptionRequest, Subscription } from '@/app/models/subscription/subscription.model';
import { ReminderPaymentService } from '@/app/services/reminder-payment/reminder-payment.service';
import { take } from 'rxjs';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { CategoryType } from '@/app/models/types/category.type';
import { SelectOption } from '@/app/shared/types/select-option.type';

@Injectable()
export class SubscriptionStore extends BaseListStore<Subscription> {
  private api = inject(ReminderPaymentService);

  private categoryFilter = signal<string | null>(null);

  setCategory(category: string | null) {
    this.categoryFilter.set(category);
  }

  protected filterFn(s: Subscription, search: string) {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const category = this.categoryFilter();

    const matchesCategory = category ? s.categoryName === category : true;

    return matchesSearch && matchesCategory;
  }

  protected sortFn(a: Subscription, b: Subscription, sortBy: string) {
    if (sortBy === 'price') return a.amount - b.amount;
    if (sortBy === 'date') return dayjs(a.nextBillingDate).diff(dayjs(b.nextBillingDate));
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  }

  load() {
    this._loading.set(true);
    this._error.set(null);

    this.api
      .getSubsriptions()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this._items.set(data);
          this._loading.set(false);
        },
        error: (err) => {
          this._error.set(err.message);
          this._loading.set(false);
        },
      });
  }

  create(request: CreateSubscriptionRequest) {
    this.api
      .createSubscription(request)
      .pipe(take(1))
      .subscribe({
        next: (newSubscription) => {
          this._items.update((items) => [newSubscription, ...items]);
          this._loading.set(false);
        },
        error: (err) => this._error.set(err.message),
      });
  }

  readonly monthlyTotal = computed(() => this.items().reduce((sum, s) => sum + s.amount, 0));

  readonly yearlyTotal = computed(() =>
    this.items().reduce((sum, s) => {
      if (s.billingCycle === 'monthly') return sum + s.amount * 12;
      if (s.billingCycle === 'yearly') return sum + s.amount;
      return sum;
    }, 0),
  );

  readonly activeCount = computed(() => this.items().filter((s) => s.status === 'ACTIVE').length);

  readonly upcomingSubscriptions = computed(() => {
    const now = dayjs().startOf('day');
    const limit = now.add(3, 'day').endOf('day');

    return this.items().filter((s) => dayjs(s.nextBillingDate).isBetween(now, limit, null, '[]'));
  });

  readonly upcomingCount = computed(() => this.upcomingSubscriptions().length);

  readonly categories = computed<SelectOption<CategoryType>[]>(() => {
    return [
      ...new Set(
        this.items()
          .map((s) => s.categoryName as CategoryType)
          .filter(Boolean),
      ),
    ].map((c) => ({
      label: c,
      value: c,
    }));
  });
}
