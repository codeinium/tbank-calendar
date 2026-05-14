import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { delay, map, Observable, of, tap } from 'rxjs';

import {
  ApiAuthTokensResponse,
  ApiPasswordResetVerificationRequest,
  ApiRefreshRequest,
  ApiSwitchAccountRequest,
} from './auth.api';

import {
  LoginRequest,
  RegisterRequest,
  RefreshRequest,
  PasswordResetVerificationRequest,
  PasswordResetConfirmRequest,
  SwitchAccountRequest,
  AuthTokens,
} from '@/app/models/auth/auth.model';

import {
  mapAuthTokens,
  mapLoginRequest,
  mapPasswordResetConfirmRequest,
  mapPasswordResetVerificationRequest,
  mapRefreshRequest,
  mapRegisterRequest,
  mapSwitchAccountRequest,
} from './auth.mapper';

import { MOCK_AUTH_TOKENS } from './auth.mock';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthTokens> {
    const apiRequest = mapLoginRequest(request);

    if (this.useMock) {
      return of(MOCK_AUTH_TOKENS).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiAuthTokensResponse>(`${this.apiUrl}/auth/login`, apiRequest)
      .pipe(
        map(mapAuthTokens),
        tap((tokens) => this.saveTokens(tokens)),
      );
  }

  register(request: RegisterRequest): Observable<AuthTokens> {
    const apiRequest = mapRegisterRequest(request);

    if (this.useMock) {
      return of(MOCK_AUTH_TOKENS).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiAuthTokensResponse>(`${this.apiUrl}/auth/register`, apiRequest)
      .pipe(
        map(mapAuthTokens),
        tap((tokens) => this.saveTokens(tokens)),
      );
  }

  refresh(request: RefreshRequest): Observable<AuthTokens> {
    const apiRequest: ApiRefreshRequest = mapRefreshRequest(request)

    if (this.useMock) {
      return of(MOCK_AUTH_TOKENS).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiAuthTokensResponse>(`${this.apiUrl}/auth/refresh`, apiRequest)
      .pipe(
        map(mapAuthTokens),
        tap((tokens) => this.saveTokens(tokens)),
      );
  }

  logout(): Observable<void> {
    if (this.useMock) {
      this.clearTokens();
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<void>(`${this.apiUrl}/auth/logout`, {})
      .pipe(tap(() => this.clearTokens()));
  }

  sendPasswordResetCode(request: PasswordResetVerificationRequest): Observable<void> {
    const apiRequest: ApiPasswordResetVerificationRequest = mapPasswordResetVerificationRequest(request)

    if (this.useMock) {
      return of(void 0).pipe(delay(this.mockDelay));
    }

    return this.http.post<void>(
      `${this.apiUrl}/auth/password-reset/verification-code`,
      apiRequest,
    );
  }

  confirmPasswordReset(request: PasswordResetConfirmRequest): Observable<AuthTokens> {
    const apiRequest = mapPasswordResetConfirmRequest(request);

    if (this.useMock) {
      return of(MOCK_AUTH_TOKENS).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiAuthTokensResponse>(`${this.apiUrl}/auth/password-reset/confirm`, apiRequest)
      .pipe(
        map(mapAuthTokens),
        tap((tokens) => this.saveTokens(tokens)),
      );
  }

  switchAccount(request: SwitchAccountRequest): Observable<AuthTokens> {
    const apiRequest: ApiSwitchAccountRequest = mapSwitchAccountRequest(request)

    if (this.useMock) {
      return of(MOCK_AUTH_TOKENS).pipe(delay(this.mockDelay));
    }

    return this.http
      .post<ApiAuthTokensResponse>(`${this.apiUrl}/auth/switch-account`, apiRequest)
      .pipe(
        map(mapAuthTokens),
        tap((tokens) => this.saveTokens(tokens)),
      );
  }

  private saveTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  }
}
