import { ABI } from "@/abis/ABI";
import { contractList } from "@/constants/contract.constant";
import { tokenList } from "@/constants/token.constant";
import { ZeroAddress } from "ethers";
import { useContractRead, useContractWrite } from "wagmi";

const useERC20 = () => {
  const approve = (chainId: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const contractWrite = useContractWrite({
      address: tokenList[chainId].LINK.address as `0x${string}`,
      abi: ABI.ERC20,
      functionName: "approve",
      args: [contractList[chainId].InvoiceFactory, 10000000000000000000000000],
    });

    return;
  };

  const balanceOf = (token: `0x${string}` | null, factory: `0x${string}`) => {
    if (!token || !factory) {
      return { data: 0, isError: false, isLoading: false };
    }
    const { data, isError, isLoading } = useContractRead({
      address: token ? token : "0x0000000000000000000000000000000000000000",
      abi: ABI.ERC20,
      functionName: "balanceOf",
      args: [factory],
      // enabled: !!token && !!owner,
    });
    return { data, isError, isLoading };
  };

  return { approve, balanceOf };
};

export default useERC20;
