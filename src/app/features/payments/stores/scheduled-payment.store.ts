import { Injectable, computed } from '@angular/core';
import { BaseListStore } from './base-list.store';
import {
  SheduledPayment,
} from '@/app/models/scheduled-payment/scheduled-payment.model';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Injectable()
export class ScheduledPaymentStore extends BaseListStore<SheduledPayment> {
  setLoading(value: boolean) {
    this._loading.set(value);
  }

  setError(value: string | null) {
    this._error.set(value);
  }

  setItems(items: SheduledPayment[]) {
    this._items.set(items);
  }

  addItem(item: SheduledPayment) {
    this._items.update((items) => [item, ...items]);
  }

  updateItem(id: string, updated: SheduledPayment) {
    this._items.update((items) => items.map((item) => (item.id === id ? updated : item)));
  }

  removeItem(id: string) {
    this._items.update((items) => items.filter((item) => item.id !== id));
  }

  protected filterFn(p: SheduledPayment, search: string) {
    return p.title.toLowerCase().includes(search.toLowerCase());
  }

  protected sortFn(a: SheduledPayment, b: SheduledPayment, sortBy: string) {
    if (sortBy === 'price') return a.amount - b.amount;
    if (sortBy === 'date') return dayjs(a.nextBillingDate).diff(dayjs(b.nextBillingDate));
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
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

  readonly upcomingSheduledPayments = computed(() => {
    const now = dayjs().startOf('day');
    const limit = now.add(3, 'day').endOf('day');

    return this.items().filter((s) => dayjs(s.nextBillingDate).isBetween(now, limit, null, '[]'));
  });

  readonly upcomingCount = computed(() => this.upcomingSheduledPayments().length);
}
