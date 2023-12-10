import { action, thunk, thunkOn } from "easy-peasy";

import invoiceService from "@/services/invoice.service";
import { InvoiceModel, InvoiceModelState } from "./invoice.type";

const initialState: InvoiceModelState = {
  list: [],
  detail: {},
  queryInvoice: {
    page: 1,
    limit: 10,
  },
  meta: {
    itemCount: 0,
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 0,
  },
  count: {
    total: 0,
    pending: 0,
    overdue: 0,
    paid: 0,
  },
};

const createInvoiceStore = (): InvoiceModel => ({
  ...initialState,

  // Action
  setList: action((state, payload) => {
    state.list = payload;
  }),
  setCountInvoiceStatus: action((state, payload) => {
    state.count = payload;
  }),
  setQueryInvoice: action((state, payload) => {
    state.queryInvoice = { ...state.queryInvoice, ...payload };
  }),
  setMeta: action((state, payload) => {
    state.meta = { ...state.meta, ...payload };
  }),
  setInvoiceDetail: action((state, payload) => {
    state.detail = payload;
  }),

  // Thunk
  getAllInvoices: thunk(async (actions, payload) => {
    try {
      const result = await invoiceService.getAllInvoices(payload);
      actions.setList(result.data.data);
      actions.setMeta(result.data.meta);
    } catch (err) {}
  }),
  getCountInvoiceStatus: thunk(async (actions, payload, helper) => {
    try {
      const invoiceStatus = await invoiceService.getCountInvoice(payload);
      actions.setCountInvoiceStatus(invoiceStatus.data);
    } catch (err) {}
  }),
  getInvoiceByInvoiceNumber: thunk(async (actions, payload) => {
    try {
      const result = await invoiceService.getInvoiceByInvoiceNumber(payload);
      actions.setInvoiceDetail(result.data);
    } catch (err) {}
  }),

  refreshGetAllInvoice: thunkOn(
    (actions) => actions.setQueryInvoice,
    async (actions, target) => {
      try {
        // await actions.getAllInvoices(target.payload);
        const result = await invoiceService.getAllInvoices(target.payload);
        actions.setList(result.data.data);
        actions.setMeta(result.data.meta);
      } catch (err) {}
    }
  ),
});

export default createInvoiceStore;
