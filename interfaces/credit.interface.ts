export interface CreditTransaction {
  _id?: string;
  amount: number;
  depreciation: number;
  remainingAmount: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Credit {
  _id?: string;
  user: string;
  name: string;
  type: string;
  amount: number;
  monthlyPayment?: number;
  balance: number;
  interestRate: number;
  startDate: Date;
  duration?: number;
  isActive: boolean;
  insurance?: number;
  transactions?: CreditTransaction[];
  createdAt?: Date;
  updatedAt?: Date;
}
