import { useEffect, useMemo, useState } from "react";
import { useAccount, useChainId } from "wagmi";

import { useStoreActions, useStoreState } from "@/store";

import Container from "@/components/Container";
import MainLayout from "@/components/Layout/MainLayout";
import PayInvoice from "@/components/Invoice/detail/pay-invoice";
import InvoiceTopic from "@/components/Invoice/detail/invoice-topic";
import InvoiceDetail from "@/components/Invoice/detail/invoice-detail";
import InvoiceConclude from "@/components/Invoice/detail/invoice-conclude";

interface IInvoiceDetail {
  invoiceNumber: string;
}

const InvoiceDetailPage = ({ invoiceNumber }: IInvoiceDetail) => {
  const chainId = useChainId();
  const { address } = useAccount();

  const [isLoading, setIsLoading] = useState(true);

  // * User store
  const isAdmin = useStoreState((state) => state.user.isAdmin);

  // * Invoice Store
  const detail = useStoreState((state) => state.invoice.detail);
  const getInvoiceByInvoiceNumber = useStoreActions(
    (state) => state.invoice.getInvoiceByInvoiceNumber
  );

  // * Fetch Data
  const fetchInvoiceByInvoiceNumber = async () => {
    setIsLoading(true);
    await getInvoiceByInvoiceNumber(invoiceNumber);
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isOwnerInvoice = useMemo(
    () => {
      return (
        address?.toLocaleLowerCase() ===
        detail.customer?.walletAddress.toLocaleLowerCase()
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, detail.customer?.walletAddress]
  );

  useEffect(() => {
    if (invoiceNumber) {
      fetchInvoiceByInvoiceNumber();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceNumber]);

  return (
    <MainLayout>
      <Container>
        <InvoiceTopic invoiceNumber={invoiceNumber} />
        {isLoading ? (
          <div className="text-center text-black animate-bounce text-xl mt-10 font-semibold">
            Loading...
          </div>
        ) : (
          <>
            {isOwnerInvoice || isAdmin ? (
              <div id="detail" className="grid grid-cols-2 gap-8">
                <section
                  id="conclude-invoice-detail"
                  className="max-w-[400px] "
                >
                  {/* Display: Conclude */}
                  <InvoiceConclude />

                  {/* Action: Pay and touch contract */}
                  {detail.status === "pending" && <PayInvoice />}
                </section>

                {/* Display: Invoice Information */}
                <InvoiceDetail />
              </div>
            ) : (
              <div className="text-red-600">
                <span className="font-medium"> Please Change account to</span>{" "}
                <span className="font-bold">
                  {detail.customer?.walletAddress}
                </span>
              </div>
            )}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default InvoiceDetailPage;
