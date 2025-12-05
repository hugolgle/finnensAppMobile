export interface FinancialTransaction {
  _id?: string;
  type: string;
  category?: string;
  title: string;
  date: Date | string;
  createdAt?: Date | string;
  tag?: string[];
  amount: number;
  [key: string]: any;
}

export interface AggregatedTransaction {
  name: string;
  amount: number;
  percentage: number;
  fill: string;
}

export function getTransactionsByType(
  data: FinancialTransaction[],
  type?: string
): FinancialTransaction[];

export function getTitleOfTransactionsByType(
  data: FinancialTransaction[],
  type: string
): string[];

export function getTagsOfTransactions(data: FinancialTransaction[]): string[];

export function aggregateTransactions(
  transactions: FinancialTransaction[],
  categoryColorsExpense: Record<string, string>
): AggregatedTransaction[];
