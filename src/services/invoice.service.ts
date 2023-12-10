import { AxiosResponse } from "axios";

import httpClient from "@/utils/httpClient";

import { IPagination } from "@/interfaces/base.interface";
import {
  CreateInvoice,
  Invoice,
  InvoiceCountStatus,
  QueryCountInvoice,
  QueryInvoice,
} from "@/interfaces/invoice.interface";

const getAllInvoices = async (
  params: QueryInvoice
): Promise<AxiosResponse<IPagination<Invoice>>> => {
  const path = "invoices/list";
  return await httpClient().get(path, { params });
};

const getInvoiceByUuid = async (uuid: string) => {
  const path = `invoices/${uuid}`;
  return await httpClient().get(path);
};

const getCountInvoice = async (
  params: QueryCountInvoice
): Promise<AxiosResponse<InvoiceCountStatus>> => {
  const path = `invoices/count/status`;
  return await httpClient().get(path, { params });
};

const getInvoiceByInvoiceNumber = async (
  invoiceNumber: string
): Promise<AxiosResponse<Invoice>> => {
  const path = `invoices/invoice-number/${invoiceNumber}`;
  return await httpClient().get(path);
};

const createInvoice = async (
  data: CreateInvoice
): Promise<AxiosResponse<Invoice>> => {
  const path = `invoices/create`;
  return await httpClient().post(path, data);
};

const deleteInvoiceByUuid = async (uuid: string) => {
  const path = `invoices/delete/${uuid}`;
  return await httpClient().delete(path);
};

const invoiceService = {
  getAllInvoices,
  getInvoiceByUuid,
  getCountInvoice,
  createInvoice,
  deleteInvoiceByUuid,
  getInvoiceByInvoiceNumber,
};

export default invoiceService;
