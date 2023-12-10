interface IChainList {
  [k: number | string]: IChain;
}

interface IChain {
  name: string;
  logo: string;
  style: string;
  subGraphUrl: string;
}

const sepolia: IChain = {
  name: "Sepolia",
  logo: "/assets/chains/sep.png",
  style: "text-blue-500",
  subGraphUrl:
    "https://api.studio.thegraph.com/query/60608/smart-heart-invoice-v2/v0.0.1",
};

const mumbai: IChain = {
  name: "Polygon Mumbai",
  logo: "/assets/chains/matic.png",
  style: "text-purple-500",
  subGraphUrl:
    "https://api.studio.thegraph.com/query/60608/smart-heart-invoice-v2/v0.0.2",
};

const fuji: IChain = {
  name: "Avalance Fuji",
  logo: "/assets/chains/avax.png",
  style: "text-red-500",
  subGraphUrl:
    "https://api.studio.thegraph.com/query/60608/smart-heart-invoice-v2/v0.0.3",
};

export const chainList: IChainList = {
  11155111: sepolia,
  80001: mumbai,
  43113: fuji,
};

interface IChainSelectorList {
  [k: string]: IChainSelector;
}

interface IChainSelector {
  name: string;
  logo: string;
}

export const chainSelectorList: IChainSelectorList = {
  "16015286601757825753": {
    name: "Sepolia",
    logo: "/assets/chains/sep.png",
  },
  "12532609583862916517": {
    name: "Polygon Mumbai",
    logo: "/assets/chains/matic.png",
  },
  "14767482510784806043": {
    name: "Avalance Fuji",
    logo: "/assets/chains/avax.png",
  },
};
