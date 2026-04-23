import { BillingCycle } from '@/app/models/goal/goal.model';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ModalDialog } from '@/app/shared/components/modal-dialog/modal-dialog';
import { UpdateAutoPayForm } from '../../forms/update-auto-pay-form/update-auto-pay-form';
import { GoalsPageStore } from '../../services/goal-page.store';
import { TuiButton } from '@taiga-ui/core';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';

@Component({
  selector: 'app-auto-pay-container',
  imports: [ModalDialog, UpdateAutoPayForm, TuiButton],
  templateUrl: './auto-pay-container.html',
  styleUrl: './auto-pay-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoPayContainer {
  private store = inject(GoalsPageStore);
  readonly goal = this.store.selectedGoal;

  readonly nextDayAutoPay = computed(() => {
    const goal = this.goal();
    if (!goal?.autoPay || !goal.billingCycle || !goal.billingInterval) {
      return null;
    }
    const today = dayjs();
    switch (goal.billingCycle) {
      case 'daily':
        return today.add(goal.billingInterval, 'day').format('YYYY-MM-DD');
      case 'weekly':
        return today.add(goal.billingInterval, 'week').format('YYYY-MM-DD');
      case 'monthly':
        return today.add(goal.billingInterval, 'month').format('YYYY-MM-DD');
      case 'yearly':
        return today.add(goal.billingInterval, 'year').format('YYYY-MM-DD');
      default:
        return null;
    }
  });

  readonly amount = computed(() => this.goal()?.autoPayAmount ?? null);

  isUpdateAutoPayModalOpen = signal(false);

  openUpdateAutoPayModal() {
    this.isUpdateAutoPayModalOpen.set(true);
  }

  closeUpdateAutoPayModal() {
    this.isUpdateAutoPayModalOpen.set(false);
  }
}
