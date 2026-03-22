import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Transaction } from '@/app/models/transaction/model/transaction.model';

@Component({
  selector: 'app-calendar-page',
  imports: [],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  
}
