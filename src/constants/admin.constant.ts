import { IToken, IChain } from "./payment-enum";

export const adminList: string[] = [
  "0x2e0904f44f78F759C63d733927aDa4785c3ed376",
  "0xa58dd04c4a30a1437974e4bfdfb1815177d8b5fa",
  "0x485dbc2092329F41Ef8ab491df6895fd176643fB",
].map((item) => item.toLocaleLowerCase());

// FIXME: Move to token.constants
export const tokenSupport: IToken[] = [
  {
    tokenAddress: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    tokenName: "Token ccip 1",
    tokenSymbol: "TC1",
    logo: "",
  },
  {
    tokenAddress: "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
    tokenName: "Token ccip 2",
    tokenSymbol: "TC2",
    logo: "",
  },
];

// FIXME: Move to chain.constants

export const chainPayer: IChain[] = [
  {
    chainId: "11155111",
    chainName: "Sepolia",
    logo: "sep",
    token: [
      {
        tokenAddress: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
        tokenName: "CCIP-BnM",
        tokenSymbol: "CCIP-BnM",
        logo: "ccip-bnm",
      },
      {
        tokenAddress: "0x466D489b6d36E7E3b824ef491C225F5830E81cC1",
        tokenName: "CCIP-LnM",
        tokenSymbol: "CCIP-LnM",
        logo: "ccip-lnm",
      },
    ],
  },
  {
    chainId: "80001",
    chainName: "Polygon Mumbai",
    logo: "matic",
    token: [
      {
        tokenAddress: "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40",
        tokenName: "CCIP-BnM",
        tokenSymbol: "CCIP-BnM",
        logo: "ccip-bnm",
      },
      {
        tokenAddress: "0xc1c76a8c5bfde1be034bbcd930c668726e7c1987",
        tokenName: "CCIP-LnM",
        tokenSymbol: "CCIP-LnM",
        logo: "ccip-lnm",
      },
    ],
  },
  {
    chainId: "43113",
    chainName: "Avalance Fuji",
    logo: "avax",
    token: [
      {
        tokenAddress: "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
        tokenName: "CCIP-BnM",
        tokenSymbol: "CCIP-BnM",
        logo: "ccip-bnm",
      },
      {
        tokenAddress: "0x70f5c5c40b873ea597776da2c21929a8282a3b35",
        tokenName: "CCIP-LnM",
        tokenSymbol: "CCIP-LnM",
        logo: "ccip-lnm",
      },
    ],
  },
];
