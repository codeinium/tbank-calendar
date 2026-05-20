import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('accessToken');

  if (token) {
    return router.createUrlTree(['/calendar']);
  }

  return true;
};
