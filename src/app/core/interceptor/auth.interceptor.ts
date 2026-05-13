import { AuthService } from '@/app/services/auth/auth.service';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken || req.url.includes('/auth/refresh')) {
          return throwError(() => error);
        }

        return inject(AuthService)
          .refresh({
            refreshToken,
          })
          .pipe(
            switchMap((tokens) => {
              localStorage.setItem('accessToken', tokens.accessToken);

              localStorage.setItem('refreshToken', tokens.refreshToken);

              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokens.accessToken}`,
                },
              });

              return next(retryReq);
            }),
          );
      }

      return throwError(() => error);
    }),
  );
};
