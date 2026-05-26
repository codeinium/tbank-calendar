import dayjs from 'dayjs';
import { Transaction } from '@/app/models/transaction/transaction.model';

export function getWeekDays(currentDate: dayjs.Dayjs, firstDayOfWeek: number): dayjs.Dayjs[] {
  const currentDay = currentDate.day();
  const diff = (currentDay - firstDayOfWeek + 7) % 7;
  const startOfWeek = currentDate.startOf('day').subtract(diff, 'day');

  return Array.from({ length: 7 }, (_, dayIndex) => {
    return startOfWeek.add(dayIndex, 'day');
  });
}

export function getMonthWeeks(monthDate: dayjs.Dayjs, firstDayOfWeek: number): dayjs.Dayjs[][] {
  const firstWeek = getWeekDays(monthDate.startOf('month'), firstDayOfWeek);

  return Array.from({ length: 6 }, (_, weekIndex) => {
    const weekStart = firstWeek[0].add(weekIndex, 'week');
    return getWeekDays(weekStart, firstDayOfWeek);
  });
}

export function getMonthDays(monthDate: dayjs.Dayjs): dayjs.Dayjs[] {
  const daysInMonth = monthDate.daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => monthDate.startOf('month').add(i, 'day'));
}

export function getWeekRange(
  currentDate: dayjs.Dayjs,
  firstDayOfWeek: number,
): { start: dayjs.Dayjs; end: dayjs.Dayjs } {
  const weekDays = getWeekDays(currentDate, firstDayOfWeek);
  return {
    start: weekDays[0],
    end: weekDays[6],
  };
}

export function formatWeekRange(currentDate: dayjs.Dayjs, firstDayOfWeek: number): string {
  const { start, end } = getWeekRange(currentDate, firstDayOfWeek);
  /*
  если неделя в одном месяце
  start.isSame(end, "month") проверяет одинаковый ли месяц у начала и конца недели
   */
  if (start.isSame(end, 'month')) {
    return `${start.format('D')} – ${end.format('D MM')}`;
  }
  // если неделя переходит в следующий месяц
  if (start.isSame(end, 'year')) {
    return `${start.format('D MM')} – ${end.format('D MM')}`;
  }
  // если неделя переходит в следующий год
  return `${start.format('D MMMM YYYY')} – ${end.format('D MMMM YYYY')}`;
}

export function getMonthWeeksList(
  monthDate: dayjs.Dayjs,
  firstDayOfWeek: number,
): { start: dayjs.Dayjs; end: dayjs.Dayjs; label: string }[] {
  const weeks = getMonthWeeks(monthDate, firstDayOfWeek);

  return weeks
    .map((week) => {
      const start = week[0];
      const end = week[6];

      if (!start.isSame(monthDate, 'month')) {
        return null;
      }

      return {
        start,
        end,
        label: `${start.format('D MMM')} – ${end.format('D MMM')}`,
      };
    })
    .filter(
      (week): week is { start: dayjs.Dayjs; end: dayjs.Dayjs; label: string } => week !== null,
    );
}

export function filterTransactionsByDay(
  transactions: Transaction[],
  day: dayjs.Dayjs,
): Transaction[] {
  return transactions.filter((t) => dayjs(t.date).isSame(day, 'day'));
}
