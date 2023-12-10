import Image from "next/image";
import { formatUnits } from "ethers";
import { useSwitchNetwork } from "wagmi";
import Link from "next/link";

interface ITokenBalance {
  chainId: string;
  balance: string;
  symbol: string;
  index: number;
}

function TokenBalance({ chainId, balance, symbol, index }: ITokenBalance) {
  const { chains } = useSwitchNetwork();

  const getChainToken = (chainId: string) => {
    return chains.find((c) => c.id === Number(chainId));
  };

  const chainToken = getChainToken(chainId);

  const backgroundImage = (chainId: string) => {
    switch (chainId) {
      case "11155111":
        return "bg-sep";
      case "80001":
        return "bg-matic";
      case "43113":
        return "bg-avax";
      default:
        return "bg-sep";
    }
  };

  return (
    <Link
      href={`/admin/claim`}
      className={`${backgroundImage(
        chainId
      )} bg-cover w-[326px] h-[146px] p-5 drop-shadow-md`}
    >
      <p className="text-white">{chainToken?.name}</p>
      <div className="flex items-center text-white">
        <div className="flex-1">
          <p className="text-xs font-extralight">Amount</p>
          <p>
            {formatUnits(balance || 0, 18)} {symbol}
          </p>
        </div>
        <div className="flex items-center space-x-10 justify-between mt-2">
          <div className="relative">
            <div>
              <Image
                src={`/assets/chains/${chainToken?.nativeCurrency.symbol.toLowerCase()}.png`}
                width={60}
                height={60}
                alt={chainId}
              />
            </div>
            <div className="absolute top-[-6px] right-[-6px]">
              <Image
                src={`/assets/tokens/ccip-bnm.png`}
                width={24}
                height={24}
                alt={chainId}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TokenBalance;
