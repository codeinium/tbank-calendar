import { ChangeDetectionStrategy, Component, Input, signal, computed, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, skip } from 'rxjs';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';

export interface CategoryOption {
  label: string;
  value: string;
}

export interface SortOption {
  label: string;
  value: string;
}

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

  searchControl = new FormControl('');
  categoryControl = new FormControl<CategoryOption>({ label: 'Все категории', value: '' });
  sortControl = new FormControl<SortOption>(SORT_OPTIONS[0]);

  readonly sortOptions = signal(SORT_OPTIONS);
  readonly categoryOptions = computed(() => {
    const cats = this.categories?.() ?? [];
    return [{ label: 'Все категории', value: '' }, ...cats];
  });

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
