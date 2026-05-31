import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { environment } from '@/environments/environment';
import { authInterceptor } from '@/app/core/interceptor/auth.interceptor';

environment.useMock = false;
environment.mockDelay = 0;

describe('Auth integration (happy path)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should register -> login -> attach token -> fetch profile', () => {
    // 1. Register
    http
      .post('/api/v1/auth/register', {
        phone: '+71112223344',
        bankPassword: 'bank-pass',
        newPassword: 'user-pass',
      })
      .subscribe();

    const registerReq = httpMock.expectOne('/api/v1/auth/register');
    registerReq.flush({ accessToken: 'access-123', refreshToken: 'refresh-456' });
    expect(localStorage.getItem('accessToken')).toBe('access-123');

    // 2. Login
    http
      .post('/api/v1/auth/login', { phone: '+71112223344', password: 'user-pass' })
      .subscribe();

    const loginReq = httpMock.expectOne('/api/v1/auth/login');
    loginReq.flush({ accessToken: 'access-789', refreshToken: 'refresh-000' });
    expect(localStorage.getItem('accessToken')).toBe('access-789');

    // 3. Fetch profile with auto-attached Bearer token
    http.get('/api/v1/users/me').subscribe((user) => {
      expect(user).toEqual({
        user_id: '1',
        first_name: 'Иван',
        last_name: 'Иванов',
        email: 'ivan@test.com',
        phone: '+71112223344',
        account_id: 'acc-1',
      });
    });

    const profileReq = httpMock.expectOne('/api/v1/users/me');
    expect(profileReq.request.headers.get('Authorization')).toBe('Bearer access-789');
    profileReq.flush({
      user_id: '1',
      first_name: 'Иван',
      last_name: 'Иванов',
      email: 'ivan@test.com',
      phone: '+71112223344',
      account_id: 'acc-1',
    });
  });

  it('should fetch transactions after auth', () => {
    localStorage.setItem('accessToken', 'my-token');

    http
      .get('/api/v1/transactions', {
        params: { dateFrom: '2026-05-01', dateTo: '2026-05-31' },
      })
      .subscribe((data: any) => {
        expect(data.length).toBe(2);
      });

    const req = httpMock.expectOne((r) => r.url.includes('/transactions'));
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-token');
    expect(req.request.params.get('dateFrom')).toBe('2026-05-01');
    req.flush([
      {
        id: '1', counterparty: 'Пятёрочка', category_name: 'Продукты',
        amount: 500, type: 'expense', transaction_date: '2026-05-04T14:31:00',
        description: '', category_color: '#FF6B6B',
      },
      {
        id: '2', counterparty: 'Работодатель', category_name: 'Зарплата',
        amount: 100000, type: 'income', transaction_date: '2026-05-01T10:00:00',
        description: '', category_color: '#4CAF50',
      },
    ]);
  });
});
