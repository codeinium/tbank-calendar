import { CalendarPageStore } from './../../store/calendar-page.store';
import { CalendarPageService } from './../../services/calendar.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { WeekDay, CalendarView } from '@/app/features/calendar/models/types';
import { FormsModule } from '@angular/forms';
import { tuiItemsHandlersProvider, TuiTextfield, TuiButton } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect, TuiCheckbox } from '@taiga-ui/kit';

interface LimitOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-calendar-settings',
  imports: [
    FormsModule,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    TuiTextfield,
    TuiButton,
    TuiCheckbox,
  ],
  templateUrl: './calendar-settings.html',
  styleUrl: './calendar-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: signal((item: string | number) => String(item)),
      identityMatcher: signal((a: string | number, b: string | number) => a === b),
    }),
  ],
})
export class CalendarSettings {
  private readonly calendar = inject(CalendarPageStore);
  private readonly pageService = inject(CalendarPageService);

  readonly view = this.calendar.view;
  readonly firstDayOfWeek = this.calendar.firstDayOfWeek;
  readonly showIncomes = this.calendar.showIncomes;
  readonly showExpense = this.calendar.showExpenses;
  readonly dayMaxTransaction = this.calendar.dayMaxTransaction;
  readonly dayMaxPlanned = this.calendar.dayMaxPlanned;

  readonly weekDays: WeekDay[] = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  readonly views: CalendarView[] = ['month', 'week'];

  readonly transactionLimits: LimitOption[] = [
    { value: 1, label: '1 транзакция' },
    { value: 2, label: '2 транзакции' },
    { value: 3, label: '3 транзакции' },
    { value: 4, label: '4 транзакции' },
    { value: 5, label: '5 транзакций' },
    { value: 1000, label: 'Без лимита' },
  ];

  readonly plannedLimits: LimitOption[] = [
    { value: 1, label: '1 напоминание' },
    { value: 2, label: '2 напоминания' },
    { value: 3, label: '3 напоминания' },
    { value: 4, label: '4 напоминания' },
    { value: 5, label: '5 напоминаний' },
    { value: 1000, label: 'Без лимита' },
  ];

  readonly selectedTransactionLimit = computed((): LimitOption => {
    const count = this.dayMaxTransaction();

    return (
      this.transactionLimits.find((limit) => limit.value === count) ?? this.transactionLimits[0]
    );
  });

  readonly selectedPlannedLimit = computed((): LimitOption => {
    const count = this.dayMaxPlanned();

    return (
      this.plannedLimits.find((limit) => limit.value === count) ?? this.plannedLimits[0]
    );
  });

  setView(view: CalendarView) {
    this.pageService.setView(view);
  }

  setFirstDayOfWeek(day: WeekDay) {
    this.calendar.setFirstDayOfWeek(day);
  }

  setShowIncomes(show: boolean) {
    this.calendar.setShowIncomes(show);
  }

  setShowExpenses(show: boolean) {
    this.calendar.setShowExpenses(show);
  }

  setDayMaxTransaction(count: number) {
    this.calendar.setDayMaxTransaction(count);
  }

  setDayMaxPlanned(count: number) {
    this.calendar.setDayMaxPlanned(count);
  }

  stringifyView = (view: CalendarView) => {
    return view === 'month' ? 'Месяц' : 'Неделя';
  };

  stringifyDayLimit = (item: LimitOption) => {
    return item.label;
  };
}
