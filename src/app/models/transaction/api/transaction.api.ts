import { TransactionType } from '../model/transaction.model';

/**
 * API модель транзакции
 */
export interface ApiTransaction {
  id: string;
  from_account_name: string;
  to_account_name: string;
  counterparty_name: string;
  category_name: string;
  amount: number;
  type: TransactionType;
  transaction_date: string;
  description: string;
  category_color: string;
}

/**
 * API параметры для запроса транзакций
 */
export interface ApiTransactionsQueryParams {
  dateFrom?: string;
  dateTo?: string;
}
