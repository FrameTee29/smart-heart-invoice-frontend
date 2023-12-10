import { IChainLinkCCIP, IChainLinkFunction } from "./chainLink.interface";

export interface IContract {
  InvoiceFunction: string;
  InvoiceFactory: string;
  // InvoiceCCIP: string;
  InvoiceUpkeep: string;
  chainLinkFunction: IChainLinkFunction;
  chainLinkCCIP: IChainLinkCCIP;
}
