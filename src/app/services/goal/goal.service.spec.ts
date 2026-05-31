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
import { GoalsService } from './goal.service';

environment.useMock = false;
environment.mockDelay = 0;

describe('GoalsService', () => {
  let service: GoalsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(GoalsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch goals', () => {
    service.getGoals().subscribe((goals) => {
      expect(goals.length).toBe(2);
      expect(goals[0].name).toBe('Машина');
    });

    const req = httpMock.expectOne('/api/v1/goals');
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: '1', name: 'Машина', target_amount: 1000000, current_amount: 200000, status: 'active' },
      { id: '2', name: 'Квартира', target_amount: 5000000, current_amount: 500000, status: 'active' },
    ]);
  });

  it('should fetch goal details by id', () => {
    service.getGoalDetails('goal-1').subscribe((details) => {
      expect(details.id).toBe('goal-1');
      expect(details.name).toBe('Машина');
    });

    const req = httpMock.expectOne('/api/v1/goals/goal-1');
    expect(req.request.method).toBe('GET');
    req.flush({
      id: 'goal-1',
      name: 'Машина',
      target_amount: 1000000,
      current_amount: 200000,
      status: 'active',
      account_id: 'acc-1',
      deadline: '2027-01-01',
      created_at: '2026-01-01T00:00:00',
      achieved_at: null,
      hard_mode: false,
      auto_pay: false,
      transactions: [],
    });
  });

  it('should create a goal', () => {
    const request = {
      refundAccountId: 'acc-1',
      name: 'Новая цель',
      targetAmount: 50000,
      deadline: '2027-06-01',
      hardMode: false,
      autoPay: false,
    };

    service.createGoal(request).subscribe((goal) => {
      expect(goal.name).toBe('Новая цель');
    });

    const req = httpMock.expectOne('/api/v1/goals');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      refund_account_id: 'acc-1',
      name: 'Новая цель',
      target_amount: 50000,
      deadline: '2027-06-01',
      hard_mode: false,
      auto_pay: false,
    });
    req.flush({
      id: 'goal-new',
      name: 'Новая цель',
      target_amount: 50000,
      current_amount: 0,
      status: 'active',
      account_id: 'acc-1',
      deadline: '2027-06-01',
      created_at: '2026-05-31T00:00:00',
      achieved_at: null,
      hard_mode: false,
      auto_pay: false,
      transactions: [],
    });
  });

  it('should contribute to a goal', () => {
    service
      .contribute('goal-1', { accountId: 'acc-1', amount: 5000 })
      .subscribe();

    const req = httpMock.expectOne('/api/v1/goals/goal-1/contribute');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ from_account_id: 'acc-1', amount: 5000 });
    req.flush({
      id: 'goal-1',
      name: 'Машина',
      target_amount: 1000000,
      current_amount: 205000,
      status: 'active',
      account_id: 'acc-1',
      deadline: '2027-01-01',
      created_at: '2026-01-01T00:00:00',
      achieved_at: null,
      hard_mode: false,
      auto_pay: false,
      transactions: [],
    });
  });

  it('should withdraw from a goal', () => {
    service.withdraw('goal-1', { amount: 10000 }).subscribe();

    const req = httpMock.expectOne('/api/v1/goals/goal-1/withdraw');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ amount: 10000 });
    req.flush({
      id: 'goal-1',
      name: 'Машина',
      target_amount: 1000000,
      current_amount: 190000,
      status: 'active',
      account_id: 'acc-1',
      deadline: '2027-01-01',
      created_at: '2026-01-01T00:00:00',
      achieved_at: null,
      hard_mode: false,
      auto_pay: false,
      transactions: [],
    });
  });

  it('should update a goal', () => {
    service
      .updateGoal('goal-1', { name: 'Новое имя', deadline: '2028-01-01' })
      .subscribe();

    const req = httpMock.expectOne('/api/v1/goals/goal-1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ name: 'Новое имя', deadline: '2028-01-01' });
    req.flush({
      id: 'goal-1',
      name: 'Новое имя',
      target_amount: 1000000,
      current_amount: 200000,
      status: 'active',
      account_id: 'acc-1',
      deadline: '2028-01-01',
      created_at: '2026-01-01T00:00:00',
      achieved_at: null,
      hard_mode: false,
      auto_pay: false,
      transactions: [],
    });
  });

  it('should update goal auto-pay settings', () => {
    service
      .updateGoalAutoPay('goal-1', { isActive: true, amount: 5000, billingCycle: 'monthly', billingInterval: 1 })
      .subscribe();

    const req = httpMock.expectOne('/api/v1/goals/goal-1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      auto_pay: true,
      auto_pay_amount: 5000,
      billing_cycle: 'monthly',
      billing_interval: 1,
    });
    req.flush({
      id: 'goal-1',
      name: 'Машина',
      target_amount: 1000000,
      current_amount: 200000,
      status: 'active',
      account_id: 'acc-1',
      deadline: '2027-01-01',
      created_at: '2026-01-01T00:00:00',
      achieved_at: null,
      hard_mode: false,
      auto_pay: true,
      transactions: [],
    });
  });

  it('should fetch goal accounts', () => {
    service.getGoalAccounts().subscribe((accounts) => {
      expect(accounts.length).toBe(1);
    });

    const req = httpMock.expectOne('/api/v1/goals/accounts');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 'acc-1',
        customer_id: '1',
        account_number: '40817810000000000001',
        status: 'ACTIVE',
        balance: 100000,
        created_at: '2026-01-01T00:00:00',
        updated_at: '2026-05-01T00:00:00',
      },
    ]);
  });

  it('should cancel a goal', () => {
    service.cancelGoal('goal-1').subscribe();

    const req = httpMock.expectOne('/api/v1/goals/goal-1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
