import { ChangeDetectionStrategy, Component, Input, signal, computed, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, skip } from 'rxjs';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import dayjs from '@/app/shared/config/dayjs/dayjs-config';
import { BillingCycle } from '@/app/models/types/billing-cycle.type';

export interface CategoryOption {
  label: string;
  value: string;
}

export interface SortOption {
  label: string;
  value: string;
}

export type ListType = 'subscription' | 'payment';

const SORT_OPTIONS: SortOption[] = [
  { value: 'date-asc', label: 'По дате (сначала ближайшие)' },
  { value: 'date-desc', label: 'По дате (сначала дальние)' },
  { value: 'name-asc', label: 'По названию а-я' },
  { value: 'name-desc', label: 'По названию я-а' },
  { value: 'price-asc', label: 'По цене ↑' },
  { value: 'price-desc', label: 'По цене ↓' },
];

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

  @Input() categories?: Signal<CategoryOption[]>;
  @Input() onCategorySelect?: (value: string | null) => void;
  @Input() onSearch?: (value: string) => void;
  @Input() onSortChange?: (value: string) => void;
  @Input() listType!: ListType;

  searchControl = new FormControl('');
  categoryControl = new FormControl<CategoryOption>({ label: 'Все категории', value: '' });
  sortControl = new FormControl<SortOption>(SORT_OPTIONS[0]);

  readonly sortOptions = signal(SORT_OPTIONS);
  readonly categoryOptions = computed(() => {
    const cats = this.categories?.() ?? [];
    return [{ label: 'Все категории', value: '' }, ...cats];
  });

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

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((v) => this.onSearch?.(v ?? ''));
    this.categoryControl.valueChanges.subscribe((v) => {
      this.onCategorySelect?.(v?.value === '' ? null : (v?.value ?? null));
    });
    this.sortControl.valueChanges.subscribe((v) => {
      if (v) this.onSortChange?.(v.value);
    });
  }
  stringifyCategory = (item: CategoryOption | null) => item?.label ?? 'Все категории';
  stringifySort = (item: SortOption | null) => item?.label ?? SORT_OPTIONS[0].label;
}
