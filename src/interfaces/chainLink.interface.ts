import { IToken } from "./token.interface";

export interface IChainLinkFunction {
  router: string;
  donID: string;
}

export interface IChainLinkCCIP {
  router: string;
  chainSelector: string;
  subscription: string;
}
