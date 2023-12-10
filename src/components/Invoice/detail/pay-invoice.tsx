import {
  useAccount,
  useChainId,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useEffect, useMemo } from "react";
import { MaxUint256, ZeroAddress, formatUnits, parseEther } from "ethers";

// ABI
import { ERC20ABI, invoiceFactoryABI } from "@/abis/ABI";

// Constant
import { contractList } from "@/constants/contract.constant";

// Store
import { useStoreActions, useStoreState } from "@/store";

// Components
import { Button } from "@/components/ui/button";

const PayInvoice = () => {
  // * Wagmi
  const chainId = useChainId();
  const { address } = useAccount();

  // * Invoice Store
  const detail = useStoreState((state) => state.invoice.detail);
  const getInvoiceByInvoiceNumber = useStoreActions(
    (state) => state.invoice.getInvoiceByInvoiceNumber
  );

  // * BalanceOf
  const { data: dataBalance, refetch: refetchBalanceOf } = useContractRead({
    address: detail?.tokenAddress as `0x${string}`,
    abi: ERC20ABI.balanceOf,
    args: [address?.toLocaleLowerCase()],
    functionName: "balanceOf",
    select(balance) {
      return balance as string;
    },
  });

  // * Allowance
  const { data: dataAllowance, refetch: refetchAllowance } = useContractRead({
    address: detail?.tokenAddress as `0xstring`,
    abi: ERC20ABI.allowance,
    functionName: "allowance",
    args: [address?.toLocaleLowerCase(), contractList[chainId].InvoiceFactory],
    select(data) {
      return data as string;
    },
  });

  // * Approved
  const { data: dataApproveERC20, writeAsync: writeApproveERC20 } =
    useContractWrite({
      address: detail?.tokenAddress as `0x${string}`,
      abi: ERC20ABI.approve,
      functionName: "approve",
    });

  // * Pay
  const { data: dataWritePay, writeAsync: writePay } = useContractWrite({
    address: contractList[chainId].InvoiceFactory as `0x${string}`,
    abi: invoiceFactoryABI.pay,
    functionName: "pay",
  });

  //   Wait approve
  const { data: dataApprove, isLoading: isLoadingApproveERC20 } =
    useWaitForTransaction({
      hash: dataApproveERC20?.hash,
    });

  //   Wait Pay
  const { data: dataPay, isLoading } = useWaitForTransaction({
    hash: dataWritePay?.hash,
  });

  const balance = useMemo((): string => {
    return formatUnits(dataBalance ?? "0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBalance]);

  const hasAllowance = useMemo(() => {
    if (Number(dataAllowance) > Number(detail.total)) {
      return true;
    }
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, dataAllowance]);

  const hasBalanceEnough = useMemo(() => {
    if (Number(balance) < Number(detail.total)) {
      return false;
    }
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, detail.total]);

  const chainCorrectly = useMemo(() => {
    if (chainId && detail.chainId) {
      return String(chainId) === String(detail.chainId);
    }
    return true;
  }, [chainId, detail.chainId]);

  // * Handle
  const handleApproveToken = async () => {
    writeApproveERC20({
      args: [contractList[chainId].InvoiceFactory, MaxUint256],
    });
  };

  const handlePayNow = async () => {
    try {
      await writePay({
        args: [
          // Chain Selector
          contractList[chainId].chainLinkCCIP.chainSelector.toString(),
          // Receive when pay cross chain
          ZeroAddress,
          // Token Address
          detail.tokenAddress,
          // Total
          parseEther(detail.total ?? "0"),
          // Subscription
          contractList[chainId].chainLinkCCIP.subscription.toString(),
          // [invoice number]
          [detail.invoiceNumber],
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const refetchInvoice = async () => {
    await refetchBalanceOf();
    await getInvoiceByInvoiceNumber(detail.invoiceNumber ?? "");
  };

  const refetchERC20 = async () => {
    await refetchBalanceOf();
    await refetchAllowance();
  };

  useEffect(() => {
    if (dataPay) {
      refetchInvoice();
    }

    if (dataApprove) {
      refetchERC20();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPay, dataApprove]);

  const ApproveButton = () => {
    return (
      <Button
        className="w-full py-3"
        size="box"
        onClick={handleApproveToken}
        disabled={isLoadingApproveERC20}
      >
        {isLoadingApproveERC20 ? (
          <div className="animate-bounce">Approving...</div>
        ) : (
          "Approve"
        )}
      </Button>
    );
  };

  const PayButton = () => {
    return (
      <Button
        className="w-full py-3"
        size="box"
        onClick={handlePayNow}
        disabled={isLoading || hasBalanceEnough === false}
      >
        {isLoading ? "Paying..." : "Pay this invoice"}
      </Button>
    );
  };

  const actionButton = useMemo(
    () => {
      if (hasBalanceEnough === false) {
        return <PayButton />;
      } else if (hasBalanceEnough === true && hasAllowance === false) {
        return <ApproveButton />;
      } else if (hasBalanceEnough === true && hasAllowance === true) {
        return <PayButton />;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      hasBalanceEnough,
      hasAllowance,
      chainCorrectly,
      isLoadingApproveERC20,
      isLoading,
    ]
  );

  return (
    <div className="mt-10">
      <div>{isLoading ? "Loading" : ""}</div>
      <div className="mb-2 space-x-1">
        <span>Balance :</span>
        <span className="font-semibold text-lg">{balance}</span>
        <span className="font-semibold">{detail.tokenSymbol}</span>
      </div>

      {chainCorrectly && actionButton}

      {hasBalanceEnough === false && chainCorrectly && (
        <div className="text-sm text-red-500 mt-1">
          <span className="font-semibold">Notice : </span>
          <span>Insufficient balance</span>
        </div>
      )}

      {chainCorrectly === false && (
        <div className="w-full text-center rounded-md bg-red-600 py-2 text-white">
          Please, switch network
        </div>
      )}
    </div>
  );
};

export default PayInvoice;
