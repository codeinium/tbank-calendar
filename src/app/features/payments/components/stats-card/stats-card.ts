import { ChangeDetectionStrategy, Component, Input, signal, computed, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { tuiItemsHandlersProvider, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';

export interface CategoryOption {
  label: string;
  value: string;
}

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
  providers: [
    tuiItemsHandlersProvider({
      stringify: signal((item: CategoryOption) => item?.label ?? ''),
      identityMatcher: signal((a: CategoryOption, b: CategoryOption) => a?.value === b?.value),
    }),
  ],
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

  readonly allCategoriesOption: CategoryOption = {
    label: 'Все категории',
    value: '',
  };

  searchControl = new FormControl('');
  categoryControl = new FormControl<CategoryOption>(this.allCategoriesOption);

  readonly categoryOptions = computed(() => {
    const cats = this.categories?.() ?? [];
    return [this.allCategoriesOption, ...cats];
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.onSearch?.(value ?? ''));
    this.categoryControl.valueChanges.subscribe((value) => {
      const categoryValue = value?.value === '' ? null : (value?.value ?? null);
      this.onCategorySelect?.(categoryValue);
    });
  }

  stringifyCategory = (item: CategoryOption | null) => {
    return item?.label ?? 'Все категории';
  };
}
