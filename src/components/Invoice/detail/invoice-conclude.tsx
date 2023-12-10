import dayjs from "dayjs";
import { DownloadIcon } from "lucide-react";

import { useStoreState } from "@/store";

import StatusLabel from "@/components/StatusLabel";
import DownloadInvoiceDPF from "@/components/DownLoadInvoicePDF";

const InvoiceConclude = () => {
  const detail = useStoreState((state) => state.invoice.detail);

  return (
    <div>
      <div className="flex flex-col space-y-4">
        {/* Status */}
        <div className="flex capitalize">
          <StatusLabel variant={detail.status?.toLocaleLowerCase() as any}>
            {detail.status}
          </StatusLabel>
        </div>

        {/* Invoice number */}
        <div className="text-xl space-x-2 flex">
          <span>Invoice :</span>
          <span className="text-primary font-semibold">
            {detail.invoiceNumber}
          </span>
          <DownloadInvoiceDPF invoiceNumber={detail.invoiceNumber ?? ""}>
            <DownloadIcon className="text-primary" />
          </DownloadInvoiceDPF>
        </div>

        {/* Total */}
        <div className="text-[#4D4C4C] space-x-1 text-4xl font-semibold">
          <span>{detail.total}</span>
          <span>{detail.tokenSymbol}</span>
        </div>

        {/* Due Date */}
        <div className="text-[#4D4C4C] text-base font-normal">
          Due {dayjs(detail.dueDate).format("MMMM DD, YYYY")}
        </div>
      </div>

      <div className="flex w-full h-[1px] bg-[#CBD5E1] my-6" />

      {/* Source to Destination */}
      <div className="text-xl space-y-4">
        <div className="flex">
          <div className="w-24 text-[#808181]">From</div>
          <div>{detail.customer?.organization}</div>
        </div>
        <div className="flex">
          <div className="w-24 text-[#808181]">To</div>
          <div>Smart Heart Invoice Co,.Ltd</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceConclude;
