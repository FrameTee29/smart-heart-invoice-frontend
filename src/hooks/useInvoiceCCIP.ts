/* eslint-disable react-hooks/rules-of-hooks */
import { contractList } from "@/constants/contract.constant";
import { TokenSymbol, tokenList } from "@/constants/token.constant";
import { useContractReads } from "wagmi";

const ccipContract = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  functionName: "balanceOf",
} as const;

const useInvoiceCCIP = () => {
  const getBalances = (tokenSymbol: TokenSymbol) => {
    const { data, isError, isLoading } = useContractReads({
      contracts: [
        {
          address: tokenList["11155111"][tokenSymbol].address as `0x${string}`,
          ...ccipContract,
          args: [contractList["11155111"].InvoiceFactory as `0x${string}`],
          chainId: 11155111,
        },
        {
          address: tokenList["80001"][tokenSymbol].address as `0x${string}`,
          ...ccipContract,
          args: [contractList["80001"].InvoiceFactory as `0x${string}`],
          chainId: 80001,
        },
        {
          address: tokenList["43113"][tokenSymbol].address as `0x${string}`,
          ...ccipContract,
          args: [contractList["43113"].InvoiceFactory as `0x${string}`],
          chainId: 43113,
        },
      ],
      select(data) {
        return [
          {
            chainId: "11155111",
            balance: data[0].result,
            symbol: tokenSymbol,
          },
          {
            chainId: "80001",
            balance: data[1].result,
            symbol: tokenSymbol,
          },
          {
            chainId: "43113",
            balance: data[2].result,
            symbol: tokenSymbol,
          },
        ];
      },
    });
    return { data, isError, isLoading };
  };

  return { getBalances };
};

export default useInvoiceCCIP;
