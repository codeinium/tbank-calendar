/**
 * Тип транзакции
 */
export type TransactionType = 'income' | 'expense';

/**
 * DTO транзакции с бэка (GET /api/v1/transactions)
 * Это готовый формат, который бэк отдаёт специально для фронта.
 */
export interface TransactionDto {
  /** UUID транзакции */
  id: string;
  /** Имя отправителя (от кого пришли деньги) */
  from_account_name: string;
  /** Имя получателя (кому пришли деньги) */
  to_account_name: string;
  /** Название контрагента (если трата не между счетами, например "Пятерочка") */
  counterparty_name: string;
  /** Название категории */
  category_name: string;
  /** Сумма */
  amount: number;
  /** Тип транзакции */
  type: TransactionType;
  /** Дата транзакции */
  transaction_date: string;
  /** Описание */
  description: string;
  /** Цвет категории */
  category_color: string;
}

/**
 * Параметры для запроса транзакций
 */
export interface TransactionsQueryParams {
  /** Дата начала */
  dateFrom?: string;
  /** Дата окончания */
  dateTo?: string;
}
