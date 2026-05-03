import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScheduledPaymentService } from '../../services/scheduled-payment.service';
import { StatsCard } from '../stats-card/stats-card';

@Component({
  selector: 'app-payments-container',
  imports: [StatsCard],
  templateUrl: './payments-container.html',
  styleUrl: './payments-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsContainer {
  service = inject(ScheduledPaymentService);
}
