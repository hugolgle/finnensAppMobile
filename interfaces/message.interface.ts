export interface Message {
  _id?: string;
  user: string;
  subject: string;
  message: string;
  status?: "no read" | "read" | "archived";
  createdAt?: Date;
  updatedAt?: Date;
}
