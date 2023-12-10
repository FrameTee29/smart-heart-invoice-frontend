import { IToken } from "@/interfaces/token.interface";

interface ITokenList {
  [k: number | string]: EachToken;
}

export type TokenSymbol = keyof EachToken;

interface EachToken {
  "CCIP-BnM": IToken;
  "CCIP-LnM": IToken;
  LINK: IToken;
}

const sepoliaTokens: EachToken = {
  "CCIP-BnM": {
    name: "CCIP-BnM",
    symbol: "CCIP-BnM",
    address: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
  },
  "CCIP-LnM": {
    name: "CCIP-LnM",
    symbol: "CCIP-LnM",
    address: "0x466D489b6d36E7E3b824ef491C225F5830E81cC1",
  },
  LINK: {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
  },
};

const mumbaiTokens: EachToken = {
  "CCIP-BnM": {
    name: "CCIP-BnM",
    symbol: "CCIP-BnM",
    address: "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40",
  },
  "CCIP-LnM": {
    name: "CCIP-LnM",
    symbol: "CCIP-LnM",
    address: "0xc1c76a8c5bfde1be034bbcd930c668726e7c1987",
  },
  LINK: {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
  },
};

const fujiTokens: EachToken = {
  "CCIP-BnM": {
    name: "CCIP-BnM",
    symbol: "CCIP-BnM",
    address: "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
  },
  "CCIP-LnM": {
    name: "CCIP-LnM",
    symbol: "CCIP-LnM",
    address: "0x70f5c5c40b873ea597776da2c21929a8282a3b35",
  },
  LINK: {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
  },
};

export const tokenList: ITokenList = {
  11155111: sepoliaTokens,
  80001: mumbaiTokens,
  43113: fujiTokens,
};

export const TokenImage: { [k: string]: string } = {
  "CCIP-BnM": "/assets/tokens/ccip-bnm.png",
  "CCIP-LnM": "/assets/tokens/ccip-lnm.png",
};
