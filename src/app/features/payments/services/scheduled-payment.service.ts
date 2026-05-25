import { inject, Injectable } from '@angular/core';
import { ScheduledPaymentStore } from '../stores/scheduled-payment.store';
import {
  CreateScheduledPaymentRequest,
  UpdateScheduledPaymentRequest,
} from '@/app/models/scheduled-payment/scheduled-payment.model';
import { ReminderPaymentService } from '@/app/services/reminder-payment/reminder-payment.service';
import { take } from 'rxjs';

@Injectable()
export class ScheduledPaymentService {
  private store = inject(ScheduledPaymentStore);
  private api = inject(ReminderPaymentService);

  payments = this.store.sorted;
  loading = this.store.loading;
  error = this.store.error;

  monthlyTotal = this.store.monthlyTotal;
  yearlyTotal = this.store.yearlyTotal;
  activeCount = this.store.activeCount;

  upcomingPayments = this.store.upcomingSheduledPayments;
  upcomingCount = this.store.upcomingCount;

  load() {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .getShedulePayments()
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

  create(request: CreateScheduledPaymentRequest) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .createScheduledPayment(request)
      .pipe(take(1))
      .subscribe({
        next: (created) => {
          this.store.addItem(created);
          this.store.setLoading(false);
        },
        error: (err) => {
          this.store.setError(err.message);
          this.store.setLoading(false);
        },
      });
  }

  update(id: string, request: UpdateScheduledPaymentRequest) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.api
      .updateScheduledPayment(id, request)
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
      .deleteScheduledPayment(id)
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
      .pauseScheduledPayment(id)
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
      .resumeScheduledPayment(id)
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
}
