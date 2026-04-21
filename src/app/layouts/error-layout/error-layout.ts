import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-error-layout',
  imports: [RouterOutlet],
  templateUrl: './error-layout.html',
  styleUrl: './error-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorLayout {}
