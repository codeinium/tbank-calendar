import { TuiRoot } from '@taiga-ui/core';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
}
