import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SheduledPaymentService } from '../../services/sheduled-payment.service';

@Component({
  selector: 'app-payments-container',
  imports: [],
  templateUrl: './payments-container.html',
  styleUrl: './payments-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsContainer {
  service = inject(SheduledPaymentService);

  readonly monthlyTotal = this.service.monthlyTotal;
  readonly yearlyTotal = this.service.yearlyTotal;
  readonly activeCount = this.service.activeCount;
  readonly upcomingCount = this.service.upcomingCount;
  readonly upcomingSheduledPayments = this.service.upcomingSheduledPayments;
}
