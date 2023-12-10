import { Chain, useContractReads } from "wagmi";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IToken } from "@/interfaces/token.interface";
import { formatUnits } from "ethers";
import { useEffect } from "react";

interface IProps {
  chain: Chain;
  chains: Chain[];
  isLoading: boolean;
  handleChangeDestinationChain: (e: string) => void;
  destinationChain: Chain | null;
  tokens: IToken[];
  factoryAddress: string;
  toggle: boolean;
}

const ERC20Contract = {
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

const DestinationChain = ({
  chain,
  chains,
  isLoading,
  handleChangeDestinationChain,
  destinationChain,
  tokens,
  factoryAddress,
  toggle,
}: IProps) => {
  const fetchBalanceTokens = tokens.map((token) => {
    return {
      ...ERC20Contract,
      address: token.address as `0x${string}`,
      args: [factoryAddress],
      chainId: destinationChain?.id,
    };
  });

  const {
    data: balances,
    isLoading: balanceIsLoading,
    refetch,
  } = useContractReads({
    contracts: fetchBalanceTokens,
  });

  useEffect(() => {
    refetch();
  }, [toggle]);

  return (
    <div className={`${destinationChain ? "" : ""}`}>
      <p className="text-xl text-center font-semibold">Destination</p>
      {destinationChain && (
        <div className="flex justify-center my-3">
          <Image
            src={`/assets/chains/${destinationChain?.nativeCurrency.symbol.toLowerCase()}.png`}
            width={100}
            height={100}
            alt={chain.name}
          />
        </div>
      )}
      <div className={`${destinationChain ? "" : "mt-3"}`}>
        <Select
          disabled={isLoading}
          onValueChange={handleChangeDestinationChain}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select destination chain" />
          </SelectTrigger>
          <SelectContent>
            {chains.map((chain) => {
              return (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={`/assets/chains/${chain?.nativeCurrency.symbol.toLowerCase()}.png`}
                      alt={chain.name}
                      width={24}
                      height={24}
                    />
                    <p>{chain.name}</p>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {isLoading || balanceIsLoading ? (
        <div className="text-center">Loading...</div>
      ) : destinationChain?.id !== chain.id ? (
        <div className="grid gap-2 mt-3">
          {balances?.map((balance, index) => {
            const token = tokens[index];
            return (
              <div key={token.symbol} className="flex items-center space-x-2">
                <div>
                  <div className="flex justify-center">
                    <Image
                      src={`/assets/tokens/${token.symbol.toLowerCase()}.png`}
                      width={50}
                      height={50}
                      alt={token.symbol}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-left">{token.symbol}</p>
                  <div className="text-left">
                    {formatUnits(balance?.result as string) || "0"}{" "}
                    {token.symbol}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DestinationChain;
