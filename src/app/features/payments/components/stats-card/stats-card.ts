import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { tuiItemsHandlersProvider, TuiTextfield } from "@taiga-ui/core";
import { TuiDataListWrapper, TuiSelect, TuiSelectDirective } from "@taiga-ui/kit";


@Component({
  selector: 'app-stats-card',
  imports: [
    FormsModule,
    TuiDataListWrapper,
    TuiSelect,
    TuiTextfield,
    ReactiveFormsModule,
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

  @Input() categories?: Signal<{ label: string; value: string }[]>;
  @Input() onCategorySelect?: (value: string | null) => void;

  @Input() onSearch?: (value: string) => void;
  searchControl = new FormControl('');
  categoriesControl = new FormControl<string[]>([]);

  constructor() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.onSearch?.(value ?? '');
    });
  }
}
