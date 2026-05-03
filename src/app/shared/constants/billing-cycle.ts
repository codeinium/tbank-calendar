import { BillingCycle } from '@/app/models/types/billing-cycle.type';
import { SelectOption } from '../types/select-option.type';

export const BILLING_CYCLE_OPTIONS: SelectOption<BillingCycle>[] = [
  { value: 'daily', label: 'Ежедневно' },
  { value: 'weekly', label: 'Еженедельно' },
  { value: 'monthly', label: 'Ежемесячно' },
  { value: 'yearly', label: 'Ежегодно' },
];
