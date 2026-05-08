import { StatisticsDashboard, SummaryCard } from './../../models/statistic/statistics.model';
import { ApiStatisticsDashboard, ApiSummaryCard } from './statistics.api';

export function mapStatisticsDashboard(api: ApiStatisticsDashboard): StatisticsDashboard {
  return {
    summary: {
      currentBalance: mapSummaryCard(api.summary.current_balance),
      income: mapSummaryCard(api.summary.income),
      expenses: mapSummaryCard(api.summary.expenses),
    },

    categoryDistribution: {
      expenses: {
        totalAmount: api.category_distribution.expenses.total_amount,
        items: api.category_distribution.expenses.items.map(mapCategoryItem),
      },

      income: {
        totalAmount: api.category_distribution.income.total_amount,
        items: api.category_distribution.income.items.map(mapCategoryItem),
      },
    },

    balanceHistory: {
      granularity: api.balance_history.granularity,
      currentPeriod: api.balance_history.current_period.map((item) => ({
        date: item.date,
        amount: item.amount,
      })),
      previousPeriod: api.balance_history.previous_period.map((item) => ({
        date: item.date,
        amount: item.amount,
      })),
    },

    impulseIndex: {
      percent: api.impulse_index.percent,
      amount: api.impulse_index.amount,
      timeFrom: api.impulse_index.time_from,
      timeTo: api.impulse_index.time_to,
    },

    spendingSpeed: {
      isReached: api.spending_speed.is_reached,
      halfSalaryReachedDate: api.spending_speed.half_salary_reached_date,
      spentPercent: api.spending_speed.spent_percent,
      comparison: api.spending_speed.comparison.map((item) => ({
        period: item.period,
        day: item.day,
      })),
    },
  };
}

function mapSummaryCard(card: ApiSummaryCard): SummaryCard {
  return {
    amount: card.amount,
    differenceFromPreviousPeriod: card.difference_from_previous_period,
    percentChange: card.percent_change,
    transactionCount: card.transaction_count,
    categoryCount: card.category_count,
  };
}

function mapCategoryItem(item: any) {
  return {
    categoryId: item.category_id,
    categoryName: item.category_name,
    amount: item.amount,
    percentage: item.percentage,
    color: item.color,
  };
}
