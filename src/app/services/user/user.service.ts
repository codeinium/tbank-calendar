import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { delay, map, Observable, of, tap } from 'rxjs';

import {
  ApiUserMeResponse,
  ApiUserEmailVerificationRequest,
  ApiUserUpdateNameRequest,
  ApiUserPasswordChangeRequest,
} from './user.api';

import {
  User,
  UserEmail,
  EmailVerificationRequest,
  EmailConfirmRequest,
  ChangePasswordRequest,
  UpdateNameRequest,
} from '@/app/models/user/user.model';

import { mapUser, mapChangePasswordRequest, mapEmailConfirmRequest, mapUpdateNameRequest } from './user.mapper';

import { mapAuthTokens } from '../auth/auth.mapper';
import { ApiAuthTokensResponse } from '../auth/auth.api';
import { AuthTokens } from '@/app/models/auth/auth.model';

import { MOCK_USER } from './user.mock';
import { MOCK_AUTH_TOKENS } from '../auth/auth.mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private http: HttpClient) {}

  getMe(userId: string): Observable<User> {
    if (this.useMock) {
      return of(MOCK_USER).pipe(delay(this.mockDelay));
    }

    return this.http
      .get<ApiUserMeResponse>(`${this.apiUrl}/users/me`, {
        headers: {
          'x-user-id': userId,
        },
      })
      .pipe(map(mapUser));
  }

  getUserEmail(id: string): Observable<UserEmail> {
    if (this.useMock) {
      return of({ email: 'test@gmail.com' }).pipe(delay(this.mockDelay));
    }

    return this.http.get<UserEmail>(`${this.apiUrl}/users/${id}/email`);
  }

  sendEmailVerificationCode(userId: string, request: EmailVerificationRequest): Observable<void> {
    const apiRequest: ApiUserEmailVerificationRequest = {
      email: request.email,
    };

    if (this.useMock) {
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.post<void>(
      `${this.apiUrl}/users/me/email/verification-code`,
      apiRequest,
      {
        headers: {
          'x-user-id': userId,
        },
      },
    );
  }

  confirmEmail(userId: string, request: EmailConfirmRequest): Observable<User> {
    if (this.useMock) {
      return of(MOCK_USER).pipe(delay(this.mockDelay));
    }

    return this.http
      .put<ApiUserMeResponse>(`${this.apiUrl}/users/me/email`, mapEmailConfirmRequest(request), {
        headers: {
          'x-user-id': userId,
        },
      })
      .pipe(map(mapUser));
  }

  deleteEmail(userId: string): Observable<void> {
    if (this.useMock) {
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.delete<void>(`${this.apiUrl}/users/me/email`, {
      headers: {
        'x-user-id': userId,
      },
    });
  }

  changePassword(userId: string, request: ChangePasswordRequest): Observable<AuthTokens> {
    const apiRequest: ApiUserPasswordChangeRequest = mapChangePasswordRequest(request);

    if (this.useMock) {
      return of(MOCK_AUTH_TOKENS).pipe(delay(this.mockDelay));
    }

    return this.http
      .put<ApiAuthTokensResponse>(`${this.apiUrl}/users/me/password`, apiRequest, {
        headers: {
          'x-user-id': userId,
        },
      })
      .pipe(
        map(mapAuthTokens),
        tap((tokens) => {
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
        }),
      );
  }

  updateName(userId: string, request: UpdateNameRequest): Observable<User> {
    const apiRequest: ApiUserUpdateNameRequest = mapUpdateNameRequest(request)

    if (this.useMock) {
      return of(MOCK_USER).pipe(delay(this.mockDelay));
    }

    return this.http
      .patch<ApiUserMeResponse>(`${this.apiUrl}/users/me/name`, apiRequest, {
        headers: {
          'x-user-id': userId,
        },
      })
      .pipe(map(mapUser));
  }
}
