
import dayjs from 'dayjs';
import { IInvoice } from './invoice.interface';

export const initialInvoiceData: IInvoice = {
    customerUuid: '',
    payerName: 'John Doe',
    payerAddress: '123 Sample Rd, Patong, Kathu, Thailand 10900',
    payerEmail: 'sample@smartheart.com',
    invoiceNumber: 'T0001',
    dueDate: dayjs().format('YYYY-MM-DD'),
    chainId: '',
    tokenAddress: '',
    tokenSymbol: '',
    tokenName: '',
    subTotal: 0,
    total: 0,
    createDate: dayjs().format('YYYY-MM-DD'),
    items: [
      {
        description: 'Item 1',
        quantity: 1,
        price: 4,
        amount: 4,
      },
    ],
  };