export interface ProductStripe {
  _id?: string;
  name?: string;
  description?: string;
  amount?: number;
  stripeProductId?: string;
  stripePriceId?: string;
  active?: boolean;
}
