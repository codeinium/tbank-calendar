import { ChangeDetectionStrategy, Component, OnInit, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiLoader } from '@taiga-ui/core';

import { RecurringSuggestion } from '@/app/models/recurring-suggestion/recurring-suggestion.model';
import { RecurringSuggestionsService } from '@/app/services/reccuring-suggestion/reccuring-suggestion.service';

@Component({
  selector: 'app-recurring-suggestions-form',
  imports: [CommonModule, TuiButton, TuiLoader],
  templateUrl: './recurring-suggestions-form.html',
  styleUrl: './recurring-suggestions-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecurringSuggestionsForm{
  private readonly service = inject(RecurringSuggestionsService);

  readonly close = output<void>();
  readonly createFromSuggestion = output<RecurringSuggestion>();

  readonly suggestions = signal<RecurringSuggestion[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.service.getSuggestions().subscribe({
      next: (suggestions) => {
        this.suggestions.set(suggestions);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Не удалось загрузить предложения');
        this.loading.set(false);
      },
    });
  }

  reject(suggestion: RecurringSuggestion) {
    this.service.rejectSuggestion({ counterpartyName: suggestion.counterpartyName }).subscribe({
      next: () => {
        this.suggestions.update((items) =>
          items.filter((item) => item.counterpartyName !== suggestion.counterpartyName),
        );
      },
      error: () => {
        this.error.set('Не удалось отклонить предложение');
      },
    });
  }
}
