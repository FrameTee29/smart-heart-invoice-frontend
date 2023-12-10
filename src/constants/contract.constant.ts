import { IContract } from "@/interfaces/contract.interface";

interface IContractList {
  [k: number]: IContract;
}

const sepoliaContracts: IContract = {
  InvoiceFunction: "0xdb3e60BFe06288bb265f88BFf09778f822aa28B7",
  InvoiceFactory: "0x9332DAb7E7d53623275E228500c5F2437652c6B9",
  InvoiceUpkeep: "0xbe0C1bA5872dA0b589268CF16e1181AC97221C42",
  chainLinkFunction: {
    router: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
    donID: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
  },
  chainLinkCCIP: {
    router: "0xd0daae2231e9cb96b94c8512223533293c3693bf",
    chainSelector: "16015286601757825753",
    subscription: "1825",
  },
};

const mumbaiContracts: IContract = {
  InvoiceFunction: "0x39eD86aD4843760F63966c2588e7c755Fe671E8a",
  InvoiceFactory: "0xa6500Ba6487d2eb4c0cE3d96F0249CD1BAE9BF90",
  InvoiceUpkeep: "0x273079b196EE12c010d965aD007b829ed7051547",
  chainLinkFunction: {
    router: "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C",
    donID: "0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000",
  },
  chainLinkCCIP: {
    router: "0x70499c328e1e2a3c41108bd3730f6670a44595d1",
    chainSelector: "12532609583862916517",
    subscription: "1106",
  },
};

const fujiContracts: IContract = {
  InvoiceFunction: "0xfe08409882008654aFa475A30fc8B55dFd9C47Ed",
  InvoiceFactory: "0x35c543d0BEE30F767C657eC4DA9ae89EB697Ad9D",
  InvoiceUpkeep: "0xa9bF8B5B5512F6fB0f0354665b534D5f451E4d59",
  chainLinkFunction: {
    router: "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0",
    donID: "0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000",
  },
  chainLinkCCIP: {
    router: "0x554472a2720e5e7d5d3c817529aba05eed5f82d8",
    chainSelector: "14767482510784806043",
    subscription: "1820",
  },
};

export const contractList: IContractList = {
  11155111: sepoliaContracts,
  80001: mumbaiContracts,
  43113: fujiContracts,
};
