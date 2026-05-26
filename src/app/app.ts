import { TuiRoot } from '@taiga-ui/core';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CategoriesStore } from './services/category/category.store';
Chart.register(...registerables);


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly categoriesStore = inject(CategoriesStore);

  ngOnInit() {
    this.categoriesStore.loadCategories();
  }
}
