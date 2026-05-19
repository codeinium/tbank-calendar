import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { ErrorLayout } from './layouts/error-layout/error-layout';
import { authGuard } from './core/guards/auth/auth-guard';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about-page/pages/about-page/about-page').then((m) => m.AboutPage),
      },
      {
        path: 'calendar',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/calendar/pages/calendar-page/calendar-page').then(
            (m) => m.CalendarPageComponent,
          ),
      },
      {
        path: 'stats',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/statistic/pages/statistics-page/statistics-page').then(
            (m) => m.StatisticsPageComponent,
          ),
      },
      {
        path: 'goals',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/goals/pages/goals-page/goals-page').then((m) => m.GoalsPageComponent),
      },
      {
        path: 'payments',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/payments/pages/payments-page/payments-page').then(
            (m) => m.PaymentsPage,
          ),
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            // canActivate: [authGuard],
            loadComponent: () =>
              import('./features/profile/pages/profile-page/profile-page').then(
                (m) => m.ProfilePage,
              ),
          },
          {
            path: 'settings',
            loadComponent: () =>
              import('./features/profile/pages/settings-page/settings-page').then(
                (m) => m.SettingsPage,
              ),
          },
        ],
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
