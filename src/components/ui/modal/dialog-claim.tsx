import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { Chain, useContractWrite } from "wagmi";
import { Button } from "../button";
import { ABI } from "@/abis/ABI";
import { adminList } from "@/constants/admin.constant";
import { contractList } from "@/constants/contract.constant";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  chains: Chain[];
  currentChain: Chain;
}

const DialogClaim = ({ open, setOpen, chains, currentChain }: Props) => {
  const [destinationChain, setDestinationChain] = useState<string | null>(null);

  const getBeneficiary = (chainId: string) => {
    if (chainId === currentChain.id.toString()) {
      return adminList[2];
    } else {
      return contractList[Number(chainId)].InvoiceFactory;
    }
  };

  const handleClaim = async () => {
    if (!destinationChain) return;
    const { write } = useContractWrite({
      address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
      abi: ABI.invoiceFactory,
      functionName: "claim",
      args: [destinationChain, getBeneficiary(destinationChain)],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            <p>Pleas select destination chain</p>
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={(e) => setDestinationChain(e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select destination chain" />
          </SelectTrigger>
          <SelectContent>
            {chains.map((chain) => {
              return (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  <div className="flex items-center space-x-3">
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
        {destinationChain &&
          destinationChain !== currentChain.id.toString() && (
            <p className="text-error text-xs">
              *maybe a long time to claim cross-chain
            </p>
          )}
        <DialogFooter>
          <Button disabled={!destinationChain} type="submit">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogClaim;
