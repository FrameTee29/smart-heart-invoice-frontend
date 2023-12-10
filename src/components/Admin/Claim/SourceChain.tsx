import { chainList } from "@/constants/chain.constant";
import { IToken } from "@/interfaces/token.interface";
import { formatUnits } from "ethers";
import Image from "next/image";
import { useEffect } from "react";
import { Chain, useContractReads } from "wagmi";

interface IProps {
  chain: Chain;
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

const SourceChain = ({ chain, tokens, factoryAddress, toggle }: IProps) => {
  const fetchBalanceTokens = tokens.map((token) => {
    return {
      ...ERC20Contract,
      address: token.address as `0x${string}`,
      args: [factoryAddress],
    };
  });

  const {
    data: balances,
    isLoading,
    refetch,
  } = useContractReads({
    contracts: fetchBalanceTokens,
  });

  useEffect(() => {
    refetch();
  }, [toggle]);

  return (
    <div className="">
      <p className="text-xl text-center font-semibold">Source chain</p>
      <div className="flex justify-center my-3">
        <Image
          src={`/assets/chains/${chain.nativeCurrency.symbol.toLowerCase()}.png`}
          width={100}
          height={100}
          alt={chain.name}
        />
      </div>
      <div className="text-center py-2 mb-3 font-medium">{chainList[chain.id].name}</div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid gap-2">
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
      )}
    </div>
  );
};

export default SourceChain;
