import { inject, Injectable } from "@angular/core";
import { SheduledPaymentStore } from "./sheduled-payment.store";
import { SortName, SortDirection } from '../types/type';

// пока этот класс вообще не нужен, но если будет бизнес логика на этой странице, то я пропишу ее сюда
@Injectable()
export class SheduledPaymentService {
  private shedulePaymentStore = inject(SheduledPaymentStore);

  load() {
    this.shedulePaymentStore.loadSheduledPayments();
  }

  sheduledPayments = this.shedulePaymentStore.sortedSheduledPayments;
  loading = this.shedulePaymentStore.loadingSheduledPayments;

  monthlyTotal = this.shedulePaymentStore.monthlyTotal;
  activeCount = this.shedulePaymentStore.activeCount;
  yearlyTotal = this.shedulePaymentStore.yearlyTotal;

  upcomingSheduledPayments = this.shedulePaymentStore.upcomingSheduledPayments;
  upcomingCount = this.shedulePaymentStore.upcomingCount;
  setSort(type: SortName) {
    this.shedulePaymentStore.setSortBy(type);
  }

  setDir(type: SortDirection) {
    this.shedulePaymentStore.setSortDir(type);
  }

  setSearch(value: string) {
    this.shedulePaymentStore.setSearch(value);
  }
}
