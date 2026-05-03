import { ChangeDetectionStrategy, Component, Input, signal, computed, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';

import dayjs from '@/app/shared/config/dayjs/dayjs-config';

import { BillingCycle } from '@/app/models/types/billing-cycle.type';
import { CategorySelectValue } from '@/app/shared/constants/categories-option';

import { SelectOption } from '@/app/shared/types/select-option.type';
import { SortValue } from '@/app/shared/types/sort.type';
import { SORT_OPTIONS } from '@/app/shared/constants/sort-options';

export type ListType = 'subscription' | 'payment';

@Component({
  selector: 'app-stats-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiChevron,
    TuiDataListWrapper,
    TuiSelect,
    TuiTextfield,
  ],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCard {
  @Input() items!: Signal<any[]>;

  @Input() title!: string;

  @Input() monthlyTotal!: Signal<number>;
  @Input() yearlyTotal!: Signal<number>;
  @Input() activeCount!: Signal<number>;
  @Input() upcomingCount!: Signal<number>;

  @Input() categories?: Signal<SelectOption<CategorySelectValue>[]>;

  @Input() onCategorySelect?: (value: CategorySelectValue | null) => void;
  @Input() onSearch?: (value: string) => void;
  @Input() onSortChange?: (value: SortValue) => void;

  @Input() listType!: ListType;

  searchControl = new FormControl<string>('');

  categoryControl = new FormControl<SelectOption<CategorySelectValue>>({
    value: '',
    label: 'Все категории',
  } as any);

  sortControl = new FormControl<SelectOption<SortValue>>(SORT_OPTIONS[0]);

  readonly sortOptions = signal<SelectOption<SortValue>[]>(SORT_OPTIONS);

  readonly categoryOptions = computed<SelectOption<CategorySelectValue>[]>(() => {
    const cats = this.categories?.() ?? [];
    return [{ value: '' as CategorySelectValue, label: 'Все категории' }, ...cats];
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((v) => this.onSearch?.(v ?? ''));

    this.categoryControl.valueChanges.subscribe((v) => {
      const value = v?.value === '' ? null : (v?.value ?? null);
      this.onCategorySelect?.(value);
    });

    this.sortControl.valueChanges.subscribe((v) => {
      if (v) {
        this.onSortChange?.(v.value);
      }
    });
  }

  formatDate(date: string | Date): string {
    return dayjs(date).format('DD.MM.YYYY');
  }

  declensionNum(num: number, forms: string[]): string {
    const n = Math.abs(num) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
  }

  getPeriodLabel(cycle: BillingCycle, interval: number): string {
    if (interval === 1) {
      switch (cycle) {
        case 'daily':
          return 'Ежедневно';
        case 'weekly':
          return 'Еженедельно';
        case 'monthly':
          return 'Ежемесячно';
        case 'yearly':
          return 'Ежегодно';
      }
    }

    const labels: Record<BillingCycle, string[]> = {
      daily: ['день', 'дня', 'дней'],
      weekly: ['неделю', 'недели', 'недель'],
      monthly: ['месяц', 'месяца', 'месяцев'],
      yearly: ['год', 'года', 'лет'],
    };

    const form = this.declensionNum(interval, labels[cycle]);
    return `Каждые ${interval} ${form}`;
  }

  readonly summaryCards = computed(() => [
    {
      title: 'Месячный итог',
      value: `₽ ${this.monthlyTotal()}`,
    },
    {
      title: 'Годовой итог',
      value: `₽ ${this.yearlyTotal()}`,
    },
    {
      title: 'Активные',
      value: this.activeCount(),
    },
    {
      title: 'Скоро списания',
      value: this.upcomingCount(),
    },
  ]);

  stringifyCategory = (item: SelectOption<CategorySelectValue> | null) =>
    item?.label ?? 'Все категории';

  stringifySort = (item: SelectOption<SortValue> | null) => item?.label ?? SORT_OPTIONS[0].label;
}
