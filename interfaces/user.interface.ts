export interface Payment {
  hasPaid?: boolean;
  receiptUrl?: string;
  paymentIntentId?: string;
  refundId?: string;
}

export interface TwoFA {
  enabled?: boolean;
  secret?: string | null;
  recoveryCodes?: string[];
}

export interface FirstConnection {
  basic?: boolean;
  premium?: boolean;
}

export interface User {
  _id?: string;
  role?: "user" | "admin";
  email: string;
  password?: string;
  lastname?: string;
  name?: string;
  country?: string;
  img?: string;
  googleId?: string;
  payment?: Payment;
  suspend?: boolean;
  refreshToken?: string;
  isVerified?: boolean;
  twoFA?: TwoFA;
  firstConnection?: FirstConnection;
  createdAt?: string;
  updatedAt?: string;
}
