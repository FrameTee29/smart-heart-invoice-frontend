import { ABI } from "@/abis/ABI";
import DestinationChain from "@/components/Admin/Claim/DestinationChain";
import SourceChain from "@/components/Admin/Claim/SourceChain";
import MainLayout from "@/components/Layout/MainLayout";
import PermissionLayout from "@/components/Layout/PermissionLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { adminList } from "@/constants/admin.constant";
import { contractList } from "@/constants/contract.constant";
import { tokenList } from "@/constants/token.constant";
import { IToken } from "@/interfaces/token.interface";
import { ZeroAddress } from "ethers";
import { ChevronsRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Chain,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";

const ClaimPage = () => {
  const { chain } = useNetwork();
  const { chains, isLoading: chainsIsLoading } = useSwitchNetwork();

  const [destinationChain, setDestinationChain] = useState<Chain | null>(null);
  const [toggle, setToggle] = useState(false);
  const { toast } = useToast();

  if (!chain) {
    return <div>Please connect</div>;
  }

  const tokensSourceChain: IToken[] = useMemo(() => {
    const list = Object.values(tokenList[chain.id]);
    return list.filter((token) => token.symbol !== "LINK");
  }, [chain.id]);

  const factorySourceChain = useMemo(() => {
    return contractList[chain.id].InvoiceFactory;
  }, [chain.id]);

  const tokensDestinationChain: IToken[] = useMemo(() => {
    if (!destinationChain) return [];
    const list = Object.values(tokenList[destinationChain.id.toString()]);
    return list.filter((token) => token.symbol !== "LINK");
  }, [destinationChain]);

  const factoryDestinationChain = useMemo(() => {
    if (!destinationChain) return ZeroAddress;
    return contractList[destinationChain.id].InvoiceFactory;
  }, [destinationChain]);

  const handleChangeDestinationChain = (e: string) => {
    const chain = chains.find((chain) => chain.id.toString() === e);
    if (!chain) return;
    setDestinationChain(chain);
  };

  const beneficiary =
    destinationChain?.id === chain.id ? adminList[0] : factoryDestinationChain;

  const { config } = usePrepareContractWrite({
    address: factorySourceChain as "0x${string}",
    abi: ABI.invoiceFactory,
    functionName: "claim",
    args: [
      destinationChain
        ? contractList[destinationChain.id].chainLinkCCIP.chainSelector
        : 0,
      beneficiary,
    ],
  });
  const { data: dataClaim, write } = useContractWrite(config);

  //   Wait claim
  const { data: dataClaimed, isLoading: isLoadingClaimed } =
    useWaitForTransaction({
      hash: dataClaim?.hash,
    });

  const claim = async () => {
    if (!destinationChain) return;
    write?.();
  };

  useEffect(() => {
    if (dataClaimed && dataClaimed.status === "success") {
      toast({
        variant: "success",
        title: "Claim success",
        description: "Claim success",
      });
      setToggle(!toggle);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataClaimed]);

  return (
    <MainLayout>
      <PermissionLayout>
        <div className="container mx-auto py-10 flex flex-col space-y-4 items-center justify-center h-[calc(100vh-65px)]">
          <div className="flex flex-col gap-4 shadow-md rounded-[5px] p-10 max-w-3xl w-full">
            <p className="text-4xl text-center font-bold">Claim token</p>
            <div className="grid grid-cols-3">
              <SourceChain
                chain={chain}
                tokens={tokensSourceChain}
                factoryAddress={factorySourceChain}
                toggle={toggle}
              />
              <div className="mx-auto flex justify-center items-center">
                <ChevronsRight size={40} />
              </div>
              <DestinationChain
                chain={chain}
                chains={chains}
                isLoading={chainsIsLoading}
                handleChangeDestinationChain={handleChangeDestinationChain}
                destinationChain={destinationChain}
                tokens={tokensDestinationChain}
                factoryAddress={factoryDestinationChain}
                toggle={toggle}
              />
            </div>
            {destinationChain?.id === chain.id && (
              <p className="text-xs text-error text-center">
                *If the destination chain is the same source chain. token will
                send to admin wallet
              </p>
            )}
          </div>
          <Button
            disabled={isLoadingClaimed || !destinationChain}
            onClick={() => claim()}
            className="max-w-md w-full"
          >
            Claim
          </Button>
        </div>
      </PermissionLayout>
    </MainLayout>
  );
};
export default ClaimPage;
