import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { weekDayLabelsShort } from '@/app/models/calendar/types';
@Component({
  selector: 'app-goals-info-container',
  imports: [TuiButton, TuiIcon],
  templateUrl: './goals-info-container.html',
  styleUrl: './goals-info-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsInfoContainer {
  readonly weekDayLabels = weekDayLabelsShort;
}
