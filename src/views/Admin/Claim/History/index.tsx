import { DocumentNode, useQuery } from "@apollo/client";

import { ClaimResponse } from "@/interfaces/claim.interface";

import Container from "@/components/Container";
import TopBarTitle from "@/components/TopBarTitle";
import MainLayout from "@/components/Layout/MainLayout";
import claimQuery from "@/services/GraphQL/queries/claim.query";
import { DataTable } from "@/components/ui/data-table/data-table";
import PermissionLayout from "@/components/Layout/PermissionLayout";
import { claimHistoryColumns } from "@/components/Admin/Claim-history/columns";
import { useNetwork } from "wagmi";
import { useMemo, useState } from "react";

const ClaimHistoryPage = () => {
  const { chain } = useNetwork();

  const { data, loading, refetch } = useQuery<ClaimResponse>(
    claimQuery.getClaims,
    {
      variables: { first: 1000 },
    }
  );

  const [meta, setMeta] = useState({
    currentPage: 1,
    limit: 10,
    itemPerPage: 10,
  });

  const paginate = (array: any, currentPage: number, itemsPerPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageItems = array.slice(startIndex, endIndex);

    return currentPageItems;
  };

  const pageCount = useMemo(
    () => {
      return Math.ceil((data?.claims.length || 0) / meta.itemPerPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.claims]
  );

  const claimData = useMemo(
    () => {
      if (data?.claims.length) {
        return paginate(data?.claims, meta.currentPage, meta.itemPerPage);
      }
      return [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.claims, meta]
  );

  const handleChangePage = async (currentPage: number) => {
    setMeta({ ...meta, currentPage: currentPage + 1 });
  };

  return (
    <MainLayout>
      <PermissionLayout>
        <Container>
          <TopBarTitle title="Claim Automation History" />
          <DataTable
            loading={loading}
            columns={claimHistoryColumns({ chain })}
            data={claimData}
            pageCount={pageCount}
            dataTableHandler={handleChangePage}
          />
        </Container>
      </PermissionLayout>
    </MainLayout>
  );
};

export default ClaimHistoryPage;
