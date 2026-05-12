import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { ErrorLayout } from './layouts/error-layout/error-layout';


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
          import('./features/statistic/pages/statistics-page/statistics-page').then(
            (m) => m.StatisticsPageComponent,
          ),
      },
      {
        path: 'goals',
        loadComponent: () =>
          import('./features/goals/pages/goals-page/goals-page').then((m) => m.GoalsPageComponent),
      },
      {
        path: 'payments',
        loadComponent: () => 
          import('./features/payments/pages/payments-page/payments-page').then((m) => m.PaymentsPage),
      },
    ],
  },
  {
    path: '',
    component: ErrorLayout,
    children: [
      {
        path: 'not-found',
        loadComponent: () =>
          import('./features/not-found/pages/not-found-page/not-found-page').then(
            (m) => m.NotFoundPage,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
