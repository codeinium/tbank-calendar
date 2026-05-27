import { Account } from "@/app/models/user/user.model";

export const MOCK_USER = {
  id: '1',
  firstName: 'user',
  lastName: 'userLastName',
  email: 'test@gmail.com',
  phone: '+71112223344',
  accountId: '1',
};

export const MOCK_ACCOUNTS: Account[]= [
  {
    accountId: '1',
    customerId: '1',
    accountNumber: '4234723840123234',
    status: 'ACTIVE',
    balance: 15000,
    createdAt: '2026-01-15T10:00:00',
    updatedAt: '2026-05-15T10:00:00',
  },
  {
    accountId: '2',
    customerId: '1',
    accountNumber: '4567260000001230',
    status: 'FROZEN',
    balance: 15000,
    createdAt: '2026-01-15T10:00:00',
    updatedAt: '2026-05-15T10:00:00',
  },
  {
    accountId: '3',
    customerId: '1',
    accountNumber: '4234723840123234',
    status: 'CLOSED',
    balance: 20000,
    createdAt: '2026-01-15T10:00:00',
    updatedAt: '2026-05-15T10:00:00',
  },
];