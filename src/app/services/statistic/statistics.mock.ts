import { StatisticsDashboard } from "@/app/models/statistic/statistics.model";

export const MOCK_STATISTICS_DASHBOARD: StatisticsDashboard = {
  summary: {
    currentBalance: {
      amount: 52000,
      differenceFromPreviousPeriod: 4000,
      percentChange: 8,
      transactionCount: 25,
      categoryCount: 7,
    },

    income: {
      amount: 70000,
      differenceFromPreviousPeriod: 5000,
      percentChange: 7,
      transactionCount: 4,
      categoryCount: 2,
    },

    expenses: {
      amount: 18000,
      differenceFromPreviousPeriod: -2000,
      percentChange: -10,
      transactionCount: 21,
      categoryCount: 5,
    },
  },

  categoryDistribution: {
    expenses: {
      totalAmount: 18000,
      items: [
        {
          categoryId: '1',
          categoryName: 'Еда',
          amount: 7000,
          percentage: 39,
          color: '#FFD54F',
        },
      ],
    },

    income: {
      totalAmount: 70000,
      items: [
        {
          categoryId: '2',
          categoryName: 'Зарплата',
          amount: 70000,
          percentage: 100,
          color: '#4CAF50',
        },
      ],
    },
  },

  balanceHistory: {
    granularity: 'day',
    currentPeriod: [
      {
        date: '2026-05-01',
        amount: 45000,
      },
      {
        date: '2026-05-02',
        amount: 47000,
      },
    ],

    previousPeriod: [
      {
        date: '2026-04-01',
        amount: 42000,
      },
      {
        date: '2026-04-02',
        amount: 43500,
      },
      {
        date: '2026-04-03',
        amount: 37900,
      },
      {
        date: '2026-04-09',
        amount: 34600,
      },
      {
        date: '2026-04-11',
        amount: 29050,
      },
    ],
  },

  impulseIndex: {
    percent: 12,
    amount: 3200,
    timeFrom: '22:00',
    timeTo: '05:00',
  },

  spendingSpeed: {
    isReached: true,
    halfSalaryReachedDate: '2026-05-14',
    spentPercent: 62,
    comparison: [
      {
        period: '2026-04',
        day: 18,
      },
    ],
  },
};
