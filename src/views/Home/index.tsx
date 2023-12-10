import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useStoreActions, useStoreState } from "@/store";

import { columns } from "@/components/Invoice/columns";
import MainLayout from "@/components/Layout/MainLayout";
import { DataTable } from "@/components/ui/data-table/data-table";
import InvoiceStatus from "@/components/Invoice/status/InvoiceStatus";
import TopBar from "@/components/Invoice/status/TopBar";

interface IHomePage {
  role: "admin" | "customer";
}

const HomePage = ({ role }: IHomePage) => {
  const { address } = useAccount();

  // User store
  const { isAdmin } = useStoreState((state) => state.user);

  // Invoice Store
  const { list, meta, queryInvoice } = useStoreState((state) => state.invoice);
  const { setQueryInvoice, getAllInvoices } = useStoreActions(
    (state) => state.invoice
  );

  const dataTableHandler = async (curPageIndex: number) => {
    const query = {
      ...queryInvoice,
      page: curPageIndex + 1,
      walletAddress: address?.toLocaleLowerCase(),
    };
    if (isAdmin && role === "admin") {
      delete query.walletAddress;
    }

    setQueryInvoice(query);
  };

  const fetchAllInvoices = async () => {
    const query = {
      ...queryInvoice,
      walletAddress: address?.toLocaleLowerCase(),
    };

    // If address is admin
    if (isAdmin && role === "admin") {
      delete query.walletAddress;
    }

    getAllInvoices(query);
    // When set Query, the easy peasy will fetch all invoices.
  };

  useEffect(() => {
    if (address) {
      fetchAllInvoices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isAdmin]);

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <TopBar role={role} />

        <InvoiceStatus role={role} />

        <DataTable
          columns={columns}
          data={list}
          pageCount={meta.totalPages}
          dataTableHandler={dataTableHandler}
        />
      </div>
    </MainLayout>
  );
};

export default HomePage;
