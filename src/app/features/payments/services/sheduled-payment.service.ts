import { inject, Injectable } from "@angular/core";
import { SheduledPaymentStore } from "./sheduled-payment.store";
import { SortName, SortDirection } from '../types/type';

// пока этот класс вообще не нужен, но если будет бизнес логика на этой странице, то я пропишу ее сюда
@Injectable()
export class SheduledPaymentService {
  private store = inject(SheduledPaymentStore);

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

  setSort(type: string) {
    this.store.setSortBy(type);
  }

  setDir(dir: 'asc' | 'desc') {
    this.store.setSortDir(dir);
  }

  setSearch(value: string) {
    this.store.setSearch(value);
  }
}