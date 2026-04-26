import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payments-container',
  imports: [],
  templateUrl: './payments-container.html',
  styleUrl: './payments-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsContainer {}
