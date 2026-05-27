import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ScheduledPaymentService } from '../../services/scheduled-payment.service';
import { StatsCard } from '../stats-card/stats-card';
import { SheduledPayment, UpdateScheduledPaymentRequest } from '@/app/models/scheduled-payment/scheduled-payment.model';
import { UpdatePayForm } from '../../forms/update-pay-form/update-pay-form';
import { ModalDialog } from "@/app/shared/components/modal-dialog/modal-dialog";

@Component({
  selector: 'app-payments-container',
  imports: [StatsCard, UpdatePayForm, ModalDialog],
  templateUrl: './payments-container.html',
  styleUrl: './payments-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsContainer {
  scheduledPaymentService = inject(ScheduledPaymentService);
  readonly isUpdatePaymentModalOpen = signal(false);
  readonly updatingPayment = signal<SheduledPayment | null>(null);
  openEditPaymentModal(payment: SheduledPayment) {
    this.updatingPayment.set(payment);
    this.isUpdatePaymentModalOpen.set(true);
  }

  closeEditPaymentModal() {
    this.isUpdatePaymentModalOpen.set(false);
    this.updatingPayment.set(null);
  }

  updatePayment(request: UpdateScheduledPaymentRequest) {
    const payment = this.updatingPayment();

    if (!payment) {
      return;
    }

    this.scheduledPaymentService.update(payment.id, request);
    this.closeEditPaymentModal();
  }
}
