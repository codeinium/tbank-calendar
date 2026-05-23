import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { delay, map, Observable, of, tap, throwError } from 'rxjs';

import {
  ApiUserMeResponse,
  ApiUserEmailVerificationRequest,
  ApiUserUpdateNameRequest,
  ApiUserPasswordChangeRequest,
  ApiAccountMeResponse,
} from './user.api';

import {
  User,
  UserEmail,
  EmailVerificationRequest,
  EmailConfirmRequest,
  ChangePasswordRequest,
  UpdateNameRequest,
  Account,
} from '@/app/models/user/user.model';

import {
  mapUser,
  mapChangePasswordRequest,
  mapEmailConfirmRequest,
  mapUpdateNameRequest,
  mapAccount,
} from './user.mapper';

import { mapAuthTokens } from '../auth/auth.mapper';
import { ApiAuthTokensResponse } from '../auth/auth.api';
import { AuthTokens } from '@/app/models/auth/auth.model';

import { MOCK_ACCOUNTS, MOCK_USER } from './user.mock';
import { MOCK_AUTH_TOKENS } from '../auth/auth.mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    if (this.useMock) {
      return of(MOCK_USER).pipe(delay(this.mockDelay));
    }

    return this.http.get<ApiUserMeResponse>(`${this.apiUrl}/users/me`).pipe(map(mapUser));
  }

  getUserEmail(id: string): Observable<UserEmail> {
    if (this.useMock) {
      return of({ email: 'test@gmail.com' }).pipe(delay(this.mockDelay));
    }

    return this.http.get<UserEmail>(`${this.apiUrl}/users/${id}/email`);
  }

  sendEmailVerificationCode(request: EmailVerificationRequest): Observable<void> {
    const apiRequest: ApiUserEmailVerificationRequest = {
      email: request.email,
    };

    if (this.useMock) {
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.post<void>(`${this.apiUrl}/users/me/email/verification-code`, apiRequest);
  }

  confirmEmail(request: EmailConfirmRequest): Observable<User> {
    if (this.useMock) {
      return of({
        ...MOCK_USER,
        email: request.email
      }).pipe(delay(this.mockDelay));
      // return throwError(
      //   () =>
      //     new HttpErrorResponse({
      //       status: 400,
      //       statusText: 'Bad Request',
      //       error: {
      //         message: 'Недопустимое значение',
              
      //       },
      //     }),
      // ).pipe(delay(100000));
    }

    return this.http
      .put<ApiUserMeResponse>(`${this.apiUrl}/users/me/email`, mapEmailConfirmRequest(request))
      .pipe(map(mapUser));
  }

  deleteEmail(): Observable<void> {
    if (this.useMock) {
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.delete<void>(`${this.apiUrl}/users/me/email`);
  }

  changePassword(request: ChangePasswordRequest): Observable<AuthTokens> {
    const apiRequest: ApiUserPasswordChangeRequest = mapChangePasswordRequest(request);

    if (this.useMock) {
      return of(MOCK_AUTH_TOKENS).pipe(delay(this.mockDelay));
    }

    return this.http
      .put<ApiAuthTokensResponse>(`${this.apiUrl}/users/me/password`, apiRequest)
      .pipe(
        map(mapAuthTokens),
        tap((tokens) => {
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
        }),
      );
  }

  updateName(request: UpdateNameRequest): Observable<User> {
    const apiRequest: ApiUserUpdateNameRequest = mapUpdateNameRequest(request);

    if (this.useMock) {
      // return throwError(
      //   () =>
      //     new HttpErrorResponse({
      //       status: 400,
      //       statusText: 'Bad Request',
      //       error: {
      //         message: 'Недопустимое значение',
      //         errors: {
      //           firstName: 'Имя не может содержать нецензурную брань',
      //         },
      //       },
      //     }),
      // ).pipe(delay(100000));
      return of({
        ...MOCK_USER,
        firstName: request.firstName,
        lastName: request.lastName,
      }).pipe(delay(this.mockDelay));
    }

    return this.http
      .patch<ApiUserMeResponse>(`${this.apiUrl}/users/me/name`, apiRequest)
      .pipe(map(mapUser));
  }

  getMyAccounts(): Observable<Account[]> {
    if (this.useMock) {
      // return of(MOCK_ACCOUNTS).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiAccountMeResponse[]>(`${this.apiUrl}/users/me/accounts`)
      .pipe(map((data) => data.map(mapAccount)));
  }
}
