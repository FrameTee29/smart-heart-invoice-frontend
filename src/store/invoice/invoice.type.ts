import { Action, Thunk, ThunkOn } from "easy-peasy";

import {
  Invoice,
  InvoiceCountStatus,
  QueryCountInvoice,
  QueryInvoice,
} from "@/interfaces/invoice.interface";
import { IPaginationMeta } from "@/interfaces/base.interface";

export interface InvoiceModelState {
  list: Invoice[];
  detail: Partial<Invoice>;
  meta: IPaginationMeta;
  count: InvoiceCountStatus;
  queryInvoice: QueryInvoice;
}

export interface InvoiceModel extends InvoiceModelState {
  setList: Action<this, Invoice[]>;
  setCountInvoiceStatus: Action<this, InvoiceCountStatus>;
  setQueryInvoice: Action<this, QueryInvoice>;
  setMeta: Action<this, IPaginationMeta>;
  setInvoiceDetail: Action<this, Invoice>;

  getAllInvoices: Thunk<this, QueryInvoice>;
  getCountInvoiceStatus: Thunk<this, QueryCountInvoice>;
  getInvoiceByInvoiceNumber: Thunk<this, string>;

  refreshGetAllInvoice: ThunkOn<this, QueryInvoice>;
}
