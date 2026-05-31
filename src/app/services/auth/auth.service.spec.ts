import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { environment } from '@/environments/environment';
import { AuthService } from './auth.service';
import type { LoginRequest, RegisterRequest, AuthTokens } from '@/app/models/auth/auth.model';

// Force HTTP mode — Angular test runner loads development env (useMock: true) by default
environment.useMock = false;
environment.mockDelay = 0;

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('login', () => {
    it('should send POST to /auth/login and save tokens', () => {
      const request: LoginRequest = { phone: '+71112223344', password: 'secret' };

      service.login(request).subscribe((tokens) => {
        expect(tokens.accessToken).toBe('real-access');
        expect(tokens.refreshToken).toBe('real-refresh');
        expect(localStorage.getItem('accessToken')).toBe('real-access');
        expect(localStorage.getItem('refreshToken')).toBe('real-refresh');
      });

      const req = httpMock.expectOne('/api/v1/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ phone: '+71112223344', password: 'secret' });

      req.flush({ accessToken: 'real-access', refreshToken: 'real-refresh' });
    });

    it('should handle empty phone in request body', () => {
      const request: LoginRequest = { phone: '', password: 'secret' };

      service.login(request).subscribe();

      const req = httpMock.expectOne('/api/v1/auth/login');
      expect(req.request.body).toEqual({ phone: '', password: 'secret' });
      req.flush({ accessToken: 't', refreshToken: 't' });
    });
  });

  describe('register', () => {
    it('should send POST to /auth/register and save tokens', () => {
      const request: RegisterRequest = {
        phone: '+71112223344',
        bankPassword: 'bank-pass',
        newPassword: 'new-pass',
      };

      service.register(request).subscribe((tokens) => {
        expect(tokens.accessToken).toBe('real-access');
        expect(localStorage.getItem('refreshToken')).toBe('real-refresh');
      });

      const req = httpMock.expectOne('/api/v1/auth/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        phone: '+71112223344',
        bankPassword: 'bank-pass',
        newPassword: 'new-pass',
      });

      req.flush({ accessToken: 'real-access', refreshToken: 'real-refresh' });
    });
  });

  describe('refresh', () => {
    it('should send POST to /auth/refresh', () => {
      service.refresh({ refreshToken: 'old-refresh' }).subscribe((tokens) => {
        expect(tokens.accessToken).toBe('new-access');
        expect(localStorage.getItem('accessToken')).toBe('new-access');
      });

      const req = httpMock.expectOne('/api/v1/auth/refresh');
      expect(req.request.body).toEqual({ refreshToken: 'old-refresh' });
      req.flush({ accessToken: 'new-access', refreshToken: 'new-refresh' });
    });
  });

  describe('logout', () => {
    it('should send POST to /auth/logout and clear tokens', () => {
      localStorage.setItem('accessToken', 'some-token');
      localStorage.setItem('refreshToken', 'some-refresh');
      localStorage.setItem('userId', '1');

      service.logout().subscribe(() => {
        expect(localStorage.getItem('accessToken')).toBeNull();
        expect(localStorage.getItem('refreshToken')).toBeNull();
        expect(localStorage.getItem('userId')).toBeNull();
      });

      const req = httpMock.expectOne('/api/v1/auth/logout');
      expect(req.request.method).toBe('POST');
      req.flush(null);
    });
  });

  describe('sendPasswordResetCode', () => {
    it('should send POST with email', () => {
      service.sendPasswordResetCode({ email: 'user@example.com' }).subscribe();

      const req = httpMock.expectOne('/api/v1/auth/password-reset/verification-code');
      expect(req.request.body).toEqual({ email: 'user@example.com' });
      req.flush(null);
    });
  });

  describe('confirmPasswordReset', () => {
    it('should send POST with confirmation data and save tokens', () => {
      service
        .confirmPasswordReset({ email: 'user@example.com', code: '123456', newPassword: 'new-pass' })
        .subscribe((tokens) => {
          expect(tokens.accessToken).toBe('reset-access');
          expect(localStorage.getItem('accessToken')).toBe('reset-access');
        });

      const req = httpMock.expectOne('/api/v1/auth/password-reset/confirm');
      expect(req.request.body).toEqual({
        email: 'user@example.com',
        code: '123456',
        new_password: 'new-pass',
      });

      req.flush({ accessToken: 'reset-access', refreshToken: 'reset-refresh' });
    });
  });

  describe('switchAccount', () => {
    it('should send POST to /auth/switch-account', () => {
      service.switchAccount({ accountId: 'acc-42' }).subscribe((tokens) => {
        expect(tokens.accessToken).toBe('switched-access');
      });

      const req = httpMock.expectOne('/api/v1/auth/switch-account');
      expect(req.request.body).toEqual({ accountId: 'acc-42' });
      req.flush({ accessToken: 'switched-access', refreshToken: 'switched-refresh' });
    });
  });
});
