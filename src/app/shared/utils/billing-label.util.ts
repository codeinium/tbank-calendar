import { BillingCycle } from '@/app/models/types/billing-cycle.type';

export function getBillingIntervalLabel(cycle: BillingCycle, interval: number): string {
  if (interval === 1) {
    switch (cycle) {
      case 'daily':
        return 'Каждый день';
      case 'weekly':
        return 'Каждую неделю';
      case 'monthly':
        return 'Каждый месяц';
      case 'yearly':
        return 'Каждый год';
    }
  }

  const labels: Record<BillingCycle, string[]> = {
    daily: ['день', 'дня', 'дней'],
    weekly: ['неделю', 'недели', 'недель'],
    monthly: ['месяц', 'месяца', 'месяцев'],
    yearly: ['год', 'года', 'лет'],
  };

  const form = declensionNum(interval, labels[cycle]);

  return `Каждые ${interval} ${form}`;
}

function declensionNum(num: number, forms: string[]): string {
  const n = Math.abs(num) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];

  return forms[2];
}
