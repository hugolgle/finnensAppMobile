export interface GroupFinancialTransaction {
  _id?: string;
  user: string;
  name: string;
  description: string;
  icon?: string;
  transactions?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
