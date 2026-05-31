import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should fetch user profile via GET /users/me', () => {
    const apiResponse = {
      user_id: '1',
      first_name: 'Иван',
      last_name: 'Иванов',
      email: 'ivan@example.com',
      phone: '+71112223344',
      account_id: 'acc-1',
    };

    service.getMe().subscribe((user) => {
      expect(user.id).toBe('1');
      expect(user.firstName).toBe('Иван');
      expect(user.lastName).toBe('Иванов');
      expect(user.email).toBe('ivan@example.com');
      expect(user.phone).toBe('+71112223344');
      expect(user.accountId).toBe('acc-1');
    });

    const req = httpMock.expectOne('/api/v1/users/me');
    expect(req.request.method).toBe('GET');
    req.flush(apiResponse);
  });

  it('should fetch user email by id', () => {
    service.getUserEmail('1').subscribe((res) => {
      expect(res.email).toBe('test@example.com');
    });

    const req = httpMock.expectOne('/api/v1/users/1/email');
    expect(req.request.method).toBe('GET');
    req.flush({ email: 'test@example.com' });
  });

  it('should send email verification code', () => {
    service.sendEmailVerificationCode({ email: 'test@example.com' }).subscribe();

    const req = httpMock.expectOne('/api/v1/users/me/email/verification-code');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com' });
    req.flush(null);
  });

  it('should confirm email and return updated user', () => {
    service
      .confirmEmail({ email: 'new@example.com', code: '123456' })
      .subscribe((user) => {
        expect(user.email).toBe('new@example.com');
      });

    const req = httpMock.expectOne('/api/v1/users/me/email');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      email: 'new@example.com',
      code: '123456',
    });
    req.flush({
      user_id: '1',
      first_name: 'Иван',
      last_name: 'Иванов',
      email: 'new@example.com',
      phone: '+71112223344',
      account_id: 'acc-1',
    });
  });

  it('should delete email', () => {
    service.deleteEmail().subscribe();

    const req = httpMock.expectOne('/api/v1/users/me/email');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should change password and save new tokens', () => {
    service
      .changePassword({ currentPassword: 'old', newPassword: 'new' })
      .subscribe((tokens) => {
        expect(tokens.accessToken).toBe('new-access');
        expect(localStorage.getItem('accessToken')).toBe('new-access');
      });

    const req = httpMock.expectOne('/api/v1/users/me/password');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      current_password: 'old',
      new_password: 'new',
    });
    req.flush({ accessToken: 'new-access', refreshToken: 'new-refresh' });
  });

  it('should update name', () => {
    service
      .updateName({ firstName: 'Петр', lastName: 'Петров' })
      .subscribe((user) => {
        expect(user.firstName).toBe('Петр');
        expect(user.lastName).toBe('Петров');
      });

    const req = httpMock.expectOne('/api/v1/users/me/name');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      firstName: 'Петр',
      lastName: 'Петров',
    });
    req.flush({
      user_id: '1',
      first_name: 'Петр',
      last_name: 'Петров',
      email: 'test@example.com',
      phone: '+71112223344',
      account_id: 'acc-1',
    });
  });

  it('should fetch accounts', () => {
    service.getMyAccounts().subscribe((accounts) => {
      expect(accounts.length).toBe(2);
      expect(accounts[0].accountId).toBe('acc-1');
      expect(accounts[0].status).toBe('ACTIVE');
    });

    const req = httpMock.expectOne('/api/v1/users/me/accounts');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 'acc-1',
        customer_id: '1',
        account_number: '40817810000000000001',
        status: 'ACTIVE',
        balance: 50000,
        created_at: '2026-01-01T00:00:00',
        updated_at: '2026-05-01T00:00:00',
      },
      {
        id: 'acc-2',
        customer_id: '1',
        account_number: '40817810000000000002',
        status: 'FROZEN',
        balance: 10000,
        created_at: '2026-01-01T00:00:00',
        updated_at: '2026-05-01T00:00:00',
      },
    ]);
  });
});
