import { AxiosResponse } from "axios";

import httpClient from "@/utils/httpClient";

import {
  Customer,
  QueryCustomer,
  CreateCustomer,
} from "@/interfaces/customer.interface";
import { IPagination } from "@/interfaces/base.interface";

const getAllCustomers = async (
  params: QueryCustomer
): Promise<AxiosResponse<IPagination<Customer>>> => {
  const path = "/customers/list";
  return await httpClient().get(path, { params });
};

const getCustomerByWalletAddress = async (
  walletAddress: string
): Promise<AxiosResponse<Customer>> => {
  const path = `/customers/wallet-address/${walletAddress}`;
  return await httpClient().get(path);
};

const createCustomer = async (
  data: CreateCustomer
): Promise<AxiosResponse<Customer>> => {
  const path = `/customers/create`;
  return await httpClient().post(path, data);
};

const customerService = {
  getAllCustomers,
  getCustomerByWalletAddress,
  createCustomer,
};

export default customerService;
