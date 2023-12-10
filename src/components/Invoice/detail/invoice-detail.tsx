import dayjs from "dayjs";
import { get } from "lodash";

import { useStoreState } from "@/store";
import { TokenImage } from "@/constants/token.constant";
import { chainList } from "@/constants/chain.constant";

interface IColumns {
  key: string;
  label: string;
  render?: (value?: any, row?: any) => any;
}

const InvoiceDetail = () => {
  // * Invoice Store
  const detail = useStoreState((state) => state.invoice.detail);

  const columns: IColumns[] = [
    { key: "invoiceNumber", label: "Invoice Number" },
    {
      key: "dueDate",
      label: "Due",
      render: (dueDate) => <div>{dayjs(dueDate).format("MMM DD, YYYY")}</div>,
    },
    { key: "customer.name", label: "Name" },
    { key: "customer.email", label: "Email" },
    { key: "customer.organization", label: "Organization" },
    { key: "customer.phoneNumber", label: "Phone" },
    { key: "customer.walletAddress", label: "Wallet address" },
    {
      key: "chainId",
      label: "Chain",
      render: (chainId) => (
        <div className="flex space-x-1 items-center">
          <picture>
            <img
              src={`${chainList[chainId].logo}`}
              alt={chainList[chainId].name}
              className="w-5"
            />
          </picture>
          <span className={`${chainList[chainId].style} font-semibold`}>
            {chainList[chainId].name}
          </span>
        </div>
      ),
    },
    {
      key: "tokenSymbol",
      label: "Token",
      render: (tokenSymbol, rows) => (
        <div className="flex space-x-1 items-center">
          <picture>
            <img
              src={`${TokenImage[tokenSymbol]}`}
              alt={tokenSymbol}
              className="w-5"
            />
          </picture>
          <span>{rows?.tokenSymbol}</span>
        </div>
      ),
    },
    {
      key: "total",
      label: "Total",
      render: (total, rows) => (
        <div className="space-x-1">
          <span>{total}</span>
          <span>{rows?.tokenSymbol}</span>
        </div>
      ),
    },
  ];

  return (
    <section id="invoice-information">
      <div className="border-[2px] border-[#CBD5E1] rounded-md px-8 py-4">
        <div className="text-lg font-semibold text-[#4D4C4C] ">
          Invoice Detail
        </div>
        <div className="mt-3 space-y-2">
          {columns.map((item) => {
            return (
              <div key={item.key} className="flex w-full">
                <div className="text-[#808181] w-1/4 font-normal">
                  {item.label}:
                </div>
                <div className="text-[#4D4C4C] w-3/4 font-medium flex-wrap">
                  {item.render
                    ? item.render(get(detail, item.key, ""), detail)
                    : get(detail, item.key, "")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetail;
