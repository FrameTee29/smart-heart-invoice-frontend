import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useStoreActions, useStoreState } from "@/store";

import { Button } from "@/components/ui/button";
import { QueryCountInvoice } from "@/interfaces/invoice.interface";

interface IInvoiceStatus {
  role: "admin" | "customer";
}

const InvoiceStatus = ({ role }: IInvoiceStatus) => {
  const { address } = useAccount();

  // User store
  const isAdmin = useStoreState((state) => state.user.isAdmin);

  // Invoice Store
  const countStatus = useStoreState((state) => state.invoice.count);
  const { getCountInvoiceStatus } = useStoreActions((state) => state.invoice);

  const columns = [
    { label: "All invoices", key: "total" },
    { label: "Pending", key: "pending" },
    { label: "Overdue", key: "overdue" },
    { label: "Paid", key: "paid" },
  ];

  const fetchCountInvoiceStatus = async () => {
    const params: QueryCountInvoice = {
      walletAddress: address?.toLocaleLowerCase(),
    };

    if (isAdmin && role === "admin") {
      delete params.walletAddress;
    }

    await getCountInvoiceStatus(params);
  };

  useEffect(() => {
    if (address) {
      fetchCountInvoiceStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div className="flex justify-between mt-12 gap-4 md:gap-24 mb-8">
      {columns.map((item) => {
        return (
          <div key={item.key} className="basis-1/2 md:basis-1/4">
            <Button
              aria-label="Go to previous page"
              variant="box"
              size="box"
              className="w-full flex-col"
            >
              <div className="text-left w-full text-xs font-normal mb-2">
                {item?.label}
              </div>
              <div className="text-left w-full text-base">
                {(countStatus as any)[item.key] ?? 0}
              </div>
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceStatus;
