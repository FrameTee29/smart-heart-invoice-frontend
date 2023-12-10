export enum EPayment {
  pending = "Pending",
  paid = "Paid",
  success = "Success",
  overdue = "Overdue",
}

export interface IToken {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  logo: string;
}

export interface IChain {
  chainId: string;
  chainName: string;
  logo: string;
  token: IToken[];
}
