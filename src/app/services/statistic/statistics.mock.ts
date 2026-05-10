import { StatisticsDashboard } from '@/app/models/statistic/statistics.model';

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

  // balanceHistory: {
  //   granularity: 'day',
  //   currentPeriod: [
  //     { date: '2026-05-01', amount: 45000 }, // остаток после апреля
  //     { date: '2026-05-02', amount: 47300 }, // +2300
  //     { date: '2026-05-03', amount: 42100 }, // -5200 крупная покупка
  //     { date: '2026-05-04', amount: 42800 }, // +700
  //     { date: '2026-05-05', amount: 5000 }, // -6900 снятие/оплата
  //     { date: '2026-05-06', amount: 5000 }, // +10200 возврат долга / перевод
  //   ],
  //   previousPeriod: [
  //     { date: '2026-04-01', amount: 5000 },
  //     { date: '2026-04-02', amount: 5100 },
  //     { date: '2026-04-03', amount: 12900 }, // +7800 пришла стипендия/подработка
  //     { date: '2026-04-04', amount: 12500 }, // -400
  //     { date: '2026-04-05', amount: 12200 }, // -300
  //     { date: '2026-04-06', amount: 8800 }, // -3400 аренда или комуслуги
  //     { date: '2026-04-07', amount: 9000 }, // +200
  //     { date: '2026-04-08', amount: 8600 }, // -400
  //     { date: '2026-04-09', amount: 22300 }, // +13700 крупный платёж
  //     { date: '2026-04-10', amount: 21800 }, // -500
  //     { date: '2026-04-11', amount: 17400 }, // -4400 техника
  //     { date: '2026-04-12', amount: 17800 }, // +400
  //     { date: '2026-04-13', amount: 17200 }, // -600
  //     { date: '2026-04-14', amount: 11500 }, // -5700 ремонт
  //     { date: '2026-04-15', amount: 11900 }, // +400
  //     { date: '2026-04-16', amount: 12500 }, // +600
  //     { date: '2026-04-17', amount: 9400 }, // -3100
  //     { date: '2026-04-18', amount: 9700 }, // +300
  //     { date: '2026-04-19', amount: 6500 }, // -3200
  //     { date: '2026-04-20', amount: 22200 }, // +15700 аванс / перевод
  //     { date: '2026-04-21', amount: 21500 }, // -700
  //     { date: '2026-04-22', amount: 20800 }, // -700
  //     { date: '2026-04-23', amount: 17000 }, // -3800
  //     { date: '2026-04-24', amount: 16600 }, // -400
  //     { date: '2026-04-25', amount: 31100 }, // +14500 подработка
  //     { date: '2026-04-26', amount: 29700 }, // -1400
  //     { date: '2026-04-27', amount: 26000 }, // -3700
  //     { date: '2026-04-28', amount: 25300 }, // -700
  //     { date: '2026-04-29', amount: 23800 }, // -1500
  //     { date: '2026-04-30', amount: 45000 }, // +21200 зарплата
  //   ],
  // },
  balanceHistory: {
    granularity: 'month',
    currentPeriod: [
      { date: '2026-01', amount: 42000 },
      { date: '2026-02', amount: 38000 },
      { date: '2026-03', amount: 45000 },
      { date: '2026-04', amount: 72000 },
      { date: '2026-05', amount: 68000 },
      { date: '2026-06', amount: 58000 },
      { date: '2026-07', amount: 62000 },
      { date: '2026-08', amount: 71000 },
      { date: '2026-09', amount: 69000 },
      { date: '2026-10', amount: 65000 },
      { date: '2026-11', amount: 74000 },
      { date: '2026-12', amount: 82000 },
    ],
    previousPeriod: [
      { date: '2025-01', amount: 35000 },
      { date: '2025-02', amount: 37000 },
      { date: '2025-03', amount: 50000 },
      { date: '2025-04', amount: 48000 },
      { date: '2025-05', amount: 44000 },
      { date: '2025-06', amount: 55000 },
      { date: '2025-07', amount: 59000 },
      { date: '2025-08', amount: 67000 },
      { date: '2025-09', amount: 72000 },
      { date: '2025-10', amount: 70000 },
      { date: '2025-11', amount: 76000 },
      { date: '2025-12', amount: 79000 },
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
