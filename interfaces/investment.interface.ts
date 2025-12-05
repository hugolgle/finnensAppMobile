export interface InvestmentTransaction {
  _id?: string;
  amount: number;
  date: Date;
  type: "buy" | "sell";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Dividend {
  _id?: string;
  amount: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Cycle {
  _id?: string;
  amountBuy: number;
  amountSale: number;
  closed: boolean;
  transactions: InvestmentTransaction[];
  result?: number;
}

export interface Investment {
  _id?: string;
  user: string;
  name: string;
  symbol?: string;
  isin?: string;
  type: string;
  dividend?: Dividend[];
  cycles?: Cycle[];
  createdAt?: Date;
  updatedAt?: Date;
}
