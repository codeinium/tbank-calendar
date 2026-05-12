export interface ApiStatisticsDashboard {
  summary: ApiSummary;
  category_distribution: ApiCategoryDistribution;
  balance_history: ApiBalanceHistory;
  impulse_index: ApiImpulseIndex;
  spending_speed: ApiSpendingSpeed;
}

export interface ApiSummary {
  current_balance: ApiSummaryCard;
  income: ApiSummaryCard;
  expenses: ApiSummaryCard;
}

export interface ApiSummaryCard {
  amount: number;
  difference_from_previous_period: number;
  percent_change: number;
  transaction_count: number;
  category_count: number;
}

export interface ApiCategoryDistribution {
  expenses: ApiCategoryDistributionData;
  income: ApiCategoryDistributionData;
}

export interface ApiCategoryDistributionData {
  total_amount: number;
  items: ApiCategoryDistributionItem[];
}

export interface ApiCategoryDistributionItem {
  category_id: string;
  category_name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface ApiBalanceHistory {
  granularity: 'day' | 'month';
  current_period: ApiBalanceHistoryItem[];
  previous_period: ApiBalanceHistoryItem[];
}

export interface ApiBalanceHistoryItem {
  date: string;
  amount: number;
}

export interface ApiImpulseIndex {
  percent: number;
  amount: number;
  time_from: string;
  time_to: string;
}

export interface ApiSpendingSpeed {
  is_reached: boolean;
  half_salary_reached_date: string | null;
  spent_percent: number;
  comparison: ApiSpendingComparison[];
}

export interface ApiSpendingComparison {
  period: string;
  day: number;
}
