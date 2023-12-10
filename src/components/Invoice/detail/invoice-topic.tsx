import { useState } from "react";
import { RefreshCwIcon } from "lucide-react";

import { useStoreActions } from "@/store";

interface IInvoiceTopic {
  invoiceNumber: string;
}

const InvoiceTopic = ({ invoiceNumber }: IInvoiceTopic) => {
  // Invoice Store
  const getInvoiceByInvoiceNumber = useStoreActions(
    (state) => state.invoice.getInvoiceByInvoiceNumber
  );

  const [loading, setLoading] = useState(false);

  const refetch = async () => {
    setLoading(true);
    await getInvoiceByInvoiceNumber(invoiceNumber);
    setLoading(false);
  };

  return (
    <section id="topic">
      <div className="flex justify-between mt-12 w-full">
        <div>
          <div className="text-4xl font-semibold mb-6 text-black">
            <h1>Invoice detail</h1>
          </div>
        </div>
        <div>
          <RefreshCwIcon
            onClick={refetch}
            className={`${loading ? "animate-spin" : ""} cursor-pointer `}
          />
        </div>
      </div>
    </section>
  );
};

export default InvoiceTopic;
