import { BaseProps, IPaginationOptions } from "./base.interface";
import { Customer } from "./customer.interface";
import { InvoiceItem } from "./invoice-item.interface";

export interface Invoice extends BaseProps {
  invoiceNumber: string;
  dueDate: string;
  paymentName: string;
  chainId: number;
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
  total: string;
  status: string;
  txnHash?: string;
  txhCount?: string;
  destinationAddress?: null;
  customer: Customer;
}

export interface QueryInvoice extends IPaginationOptions {
  walletAddress?: string;
}

export interface QueryCountInvoice {
  walletAddress?: string;
}

export interface CreateInvoice {
  customerUuid: string;
  dueDate: string;
  paymentName: string;
  chainId: string;
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
  total: number;
  item: InvoiceItem[];
}

export interface InvoiceCountStatus {
  total: number;
  pending: number;
  overdue: number;
  paid: number;
}
