import { inject, Injectable } from '@angular/core';
import { ScheduledPaymentStore } from '../stores/scheduled-payment.store';
import { SortName, SortDirection } from '../types/type';

// пока этот класс вообще не нужен, но если будет бизнес логика на этой странице, то я пропишу ее сюда
@Injectable()
export class ScheduledPaymentService {
  private store = inject(ScheduledPaymentStore);

  load() {
    this.store.load();
  }

  payments = this.store.sorted;
  loading = this.store.loading;

  monthlyTotal = this.store.monthlyTotal;
  yearlyTotal = this.store.yearlyTotal;
  activeCount = this.store.activeCount;

  upcomingPayments = this.store.upcomingSheduledPayments;
  upcomingCount = this.store.upcomingCount;

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
}
