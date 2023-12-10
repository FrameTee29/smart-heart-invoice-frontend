import dayjs from "dayjs";
import { ColumnDef } from "@tanstack/react-table";

import { InvoiceLabel } from "./payment-label";
import { DialogDetail } from "../ui/modal/dialog-detail";
import { Invoice } from "@/interfaces/invoice.interface";
import { Button } from "../ui/button";
import Link from "next/link";

export type Payment = {
  date: string;
  invoiceNumber: string;
  customer: string;
  amount: string;
  due: string;
  status: React.ReactNode;
  action: string;
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.getValue("createdAt")).format("MMM DD YYYY")}</div>
      );
    },
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice number",
    cell: ({ row }) => {
      return <div className="text-base">{row.getValue("invoiceNumber")}</div>;
    },
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <span className="font-semibold">{row.getValue("total")}</span>
          <span>{row.original["tokenSymbol"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      return <div>{dayjs(row.getValue("dueDate")).format("MMM DD YYYY")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      //FOR NOW | no time to write cron to update status in backend, so just ignore first
      //const dayDiff = dayjs(row.getValue('due')).diff(dayjs(), 'day');
      // const dayDiff = dayjs(row.getValue("createdAt")).diff(dayjs(), "day");

      // let statusPay = "pending";
      // if (dayDiff < 0) {
      //   statusPay = "overdue";
      // } else {
      //   statusPay = row.getValue("status");
      // }
      return <InvoiceLabel typeStatus={row.getValue("status")} />;
    },
  },
  {
    accessorKey: "acion",
    header: "",
    cell: ({ row }) => {
      return (
        <Link href={`/invoice/${row.getValue("invoiceNumber")}`}>
          <Button size="sm" variant="default">View</Button>
        </Link>
      );
    },
  },
];
