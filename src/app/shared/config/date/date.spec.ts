import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ru';

dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('ru');

import {
  getWeekDays,
  getMonthWeeks,
  getMonthDays,
  getWeekRange,
  formatWeekRange,
  getMonthWeeksList,
  filterTransactionsByDay,
} from './date';
import type { Transaction } from '@/app/models/transaction/transaction.model';

describe('getWeekDays', () => {
  it('should return 7 days starting from Monday when firstDayOfWeek=1', () => {
    const wednesday = dayjs('2026-05-27');
    const days = getWeekDays(wednesday, 1);

    expect(days).toHaveLength(7);
    expect(days[0].format('YYYY-MM-DD')).toBe('2026-05-25');
    expect(days[6].format('YYYY-MM-DD')).toBe('2026-05-31');
  });

  it('should return 7 days starting from Sunday when firstDayOfWeek=0', () => {
    const wednesday = dayjs('2026-05-27');
    const days = getWeekDays(wednesday, 0);

    expect(days).toHaveLength(7);
    expect(days[0].format('YYYY-MM-DD')).toBe('2026-05-24');
    expect(days[6].format('YYYY-MM-DD')).toBe('2026-05-30');
  });
});

describe('getMonthDays', () => {
  it('should return correct number of days for May (31)', () => {
    const days = getMonthDays(dayjs('2026-05-01'));
    expect(days).toHaveLength(31);
    expect(days[0].format('YYYY-MM-DD')).toBe('2026-05-01');
    expect(days[30].format('YYYY-MM-DD')).toBe('2026-05-31');
  });

  it('should return 28 days for February 2026', () => {
    const days = getMonthDays(dayjs('2026-02-01'));
    expect(days).toHaveLength(28);
  });
});

describe('getMonthWeeks', () => {
  it('should return 6 weeks for May 2026', () => {
    const weeks = getMonthWeeks(dayjs('2026-05-01'), 1);
    expect(weeks).toHaveLength(6);
    expect(weeks[0]).toHaveLength(7);
  });
});

describe('getWeekRange', () => {
  it('should return start and end of the week', () => {
    const { start, end } = getWeekRange(dayjs('2026-05-27'), 1);
    expect(start.format('YYYY-MM-DD')).toBe('2026-05-25');
    expect(end.format('YYYY-MM-DD')).toBe('2026-05-31');
  });
});

describe('formatWeekRange', () => {
  it('should format range within same month', () => {
    const result = formatWeekRange(dayjs('2026-05-27'), 1);
    expect(result).toBe('25 – 31 05');
  });

  it('should format range crossing months', () => {
    const result = formatWeekRange(dayjs('2026-05-01'), 1);
    expect(result).toContain('–');
  });
});

describe('getMonthWeeksList', () => {
  it('should return weeks that intersect with the given month', () => {
    const weeks = getMonthWeeksList(dayjs('2026-05-01'), 1);
    expect(weeks.length).toBeGreaterThan(0);
    weeks.forEach((w) => {
      expect(w.start.isSame(dayjs('2026-05'), 'month')).toBe(true);
      expect(w.label).toContain('–');
    });
  });
});

describe('filterTransactionsByDay', () => {
  const transactions: Transaction[] = [
    {
      id: '1', counterpartyName: 'A', categoryName: 'Food', amount: 100,
      type: 'expense', date: '2026-05-27T10:00:00', description: '', categoryColor: '#000',
    },
    {
      id: '2', counterpartyName: 'B', categoryName: 'Salary', amount: 500,
      type: 'income', date: '2026-05-27T14:00:00', description: '', categoryColor: '#fff',
    },
    {
      id: '3', counterpartyName: 'C', categoryName: 'Food', amount: 50,
      type: 'expense', date: '2026-05-28T09:00:00', description: '', categoryColor: '#000',
    },
  ];

  it('should return transactions matching the day', () => {
    const result = filterTransactionsByDay(transactions, dayjs('2026-05-27'));
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
  });

  it('should return empty array when no transactions match', () => {
    const result = filterTransactionsByDay(transactions, dayjs('2026-06-01'));
    expect(result).toEqual([]);
  });
});
