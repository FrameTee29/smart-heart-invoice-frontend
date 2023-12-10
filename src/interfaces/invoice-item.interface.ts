import { BaseProps } from "./base.interface";

export interface InvoiceItem extends BaseProps {
  description: string;
  quantity: number;
  price: number;
  amount: number;
}
