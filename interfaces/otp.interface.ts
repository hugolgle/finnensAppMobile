export interface OTP {
  _id?: string;
  email: string;
  code: string;
  expires: Date;
}
