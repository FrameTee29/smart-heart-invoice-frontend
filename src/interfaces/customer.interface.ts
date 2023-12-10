import { BaseProps, IPaginationOptions } from "./base.interface";

export interface Customer extends BaseProps {
  name: string;
  email: string;
  organization: string;
  phoneNumber: string;
  walletAddress: string;
  address: string;
}

export interface QueryCustomer extends IPaginationOptions {
  walletAddress?: string;
}

export interface CreateCustomer {
  name: string;
  email: string;
  organization: string;
  phoneNumber: string;
  walletAddress: string;
  address: string;
}
