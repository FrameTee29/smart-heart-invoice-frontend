export interface IInvoice {
    customerUuid: string;
    payerName: string;
    payerAddress: string;
    payerEmail: string;
    invoiceNumber: string;
    dueDate: string;
    chainId: string;
    tokenAddress: string;
    tokenSymbol: string;
    tokenName: string;
    subTotal: number;
    total: number;
    createDate: string;
    items: IItemDescription[];
}
export interface IItemDescription {
    description: string;
    quantity: number;
    price: number;
    amount: number;
}