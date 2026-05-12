export interface StatisticsDashboard {
  summary: Summary;
  categoryDistribution: CategoryDistribution;
  balanceHistory: BalanceHistory;
  impulseIndex: ImpulseIndex;
  spendingSpeed: SpendingSpeed;
}

export interface Summary {
  currentBalance: SummaryCard;
  income: SummaryCard;
  expenses: SummaryCard;
}

export interface SummaryCard {
  amount: number;
  differenceFromPreviousPeriod: number;
  percentChange: number;
  transactionCount: number;
  categoryCount: number;
}

export interface CategoryDistribution {
  expenses: CategoryDistributionData;
  income: CategoryDistributionData;
}

export interface CategoryDistributionData {
  totalAmount: number;
  items: CategoryDistributionItem[];
}

export interface CategoryDistributionItem {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface BalanceHistory {
  granularity: 'day' | 'month';
  currentPeriod: BalanceHistoryItem[];
  previousPeriod: BalanceHistoryItem[];
}

export interface BalanceHistoryItem {
  date: string;
  amount: number;
}

export interface ImpulseIndex {
  percent: number;
  amount: number;
  timeFrom: string;
  timeTo: string;
}

export interface SpendingSpeed {
  isReached: boolean;
  halfSalaryReachedDate: string | null;
  spentPercent: number;
  comparison: SpendingComparison[];
}

export interface SpendingComparison {
  period: string;
  day: number;
}
