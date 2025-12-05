export interface EpargnTransaction {
  _id?: string;
  type: "deposit" | "withdraw" | "transfer" | "interest";
  amount: number;
  date: Date;
  toAccount?: string;
  fromAccount?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MonthlyStatement {
  date: Date | string;
  balance: number;
}

export interface Epargn {
  _id?: string;
  user: string;
  livret: any;
  balance: number;
  lastInterestCalculation: Date;
  amountInterest?: number;
  transactions?: EpargnTransaction[];
  monthlyStatements: MonthlyStatement[];
  createdAt?: Date;
  updatedAt?: Date;
}
