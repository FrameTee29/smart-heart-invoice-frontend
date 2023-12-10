import { persist } from "easy-peasy";

import { CounterModel } from "./counter/counter.type";
import { InvoiceModel } from "./invoice/invoice.type";

import createCounterStore from "./counter/counter.model";
import createInvoiceStore from "./invoice/invoice.model";
import { UserModel } from "./user/user.type";
import createUserStore from "./user/user.model";

export interface StoreModel {
  counter: CounterModel;
  invoice: InvoiceModel;
  user: UserModel;
}

const storeDefinition: StoreModel = {
  counter: persist(createCounterStore()),
  invoice: createInvoiceStore(),
  user: createUserStore(),
};

export default storeDefinition;
