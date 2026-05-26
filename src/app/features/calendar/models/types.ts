import dayjs from '@/app/shared/config/dayjs/dayjs-config'

export type CalendarView = 'month' | 'week';
export type ChartView = 'pie' | 'line';

export type WeekDay =
  | 'Понедельник'
  | 'Вторник'
  | 'Среда'
  | 'Четверг'
  | 'Пятница'
  | 'Суббота'
  | 'Воскресенье';

export interface WeekItem {
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
    label: string;
}

export const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export const WEEK_DAY_TO_NUMBER: Record<WeekDay, number> = {
  Воскресенье: 0,
  Понедельник: 1,
  Вторник: 2,
  Среда: 3,
  Четверг: 4,
  Пятница: 5,
  Суббота: 6,
};


export const weekDayLabels = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];

export const weekDayLabelsShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];