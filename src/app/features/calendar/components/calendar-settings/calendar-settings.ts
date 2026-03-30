import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { WeekDay } from '@/app/models/calendar/types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tuiItemsHandlersProvider, TuiTextfield, TuiButton, TuiIcon } from '@taiga-ui/core';
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
    FormsModule,
    ReactiveFormsModule
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
  private calendar = inject(CalendarService);
  readonly view = this.calendar.view;
  readonly firstDayOfWeek = this.calendar.firstDayOfWeek;
  readonly showIncomes = this.calendar.showIncomes;
  readonly showExpense = this.calendar.showExpenses;
  readonly dayMaxTransaction = this.calendar.dayMaxTransaction;
  readonly weekDays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];
  readonly transactionLimits: LimitOption[] = [
    { value: 1, label: '1 транзакция' },
    { value: 2, label: '2 транзакции' },
    { value: 3, label: '3 транзакции' },
    { value: 4, label: '4 транзакции' },
    { value: 5, label: '5 транзакций' },
    { value: 1000, label: 'Без лимита' },
  ];

  readonly selectedLimit = computed((): LimitOption => {
    const count = this.dayMaxTransaction();
    return this.transactionLimits.find((l) => l.value === count) ?? this.transactionLimits[0];
  });

  setView(view: 'month' | 'week') {
    this.calendar.setView(view);
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

  stringifyDayTransaction = (item: LimitOption) => {
    return (item as LimitOption).label;
  };
}
