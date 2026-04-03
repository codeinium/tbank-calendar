import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/calendar/pages/calendar-page/calendar-page').then(
            (m) => m.CalendarPageComponent,
          ),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('./features/statistic/pages/statistic-page/statistic-page').then(
            (m) => m.StatisticPageComponent,
          ),
      },
      {
        path: 'goals',
        loadComponent: () =>
          import('./features/goals/pages/goals-page/goals-page').then(
            (m) => m.GoalsPageComponent,
          ),
      },
    ],
  },
];
