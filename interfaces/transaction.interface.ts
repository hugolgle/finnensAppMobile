export interface Refund {
  title: string;
  amount: number;
  date: string;
}

export interface FinancialTransaction {
  _id?: string;
  user: string;
  type: string;
  category: string;
  title: string;
  date: Date;
  detail?: string;
  amount: number;
  initialAmount?: number;
  refunds?: Refund[];
  tag?: string[];
  creditId?: string;
  paymentId?: string;
  createdAt?: string;
  updatedAt?: string;
}
