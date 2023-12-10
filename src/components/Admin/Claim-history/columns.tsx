import dayjs from "dayjs";
import { Chain } from "wagmi";
import { ColumnDef } from "@tanstack/react-table";

import { truncateAddress } from "@/utils/common";

import { Claim } from "@/interfaces/claim.interface";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { chainSelectorList } from "@/constants/chain.constant";

interface ClaimHistoryColumnsProps {
  chain?: Chain & {
    unsupported?: boolean;
  };
}

export const claimHistoryColumns = ({
  chain,
}: ClaimHistoryColumnsProps): ColumnDef<Claim>[] => {
  return [
    {
      accessorKey: "blockTimestamp",
      header: "Timestamp",
      cell: ({ row }) => {
        return (
          <div className="w-[180px]">
            {dayjs(Number(row.getValue("blockTimestamp")) * 1000).format(
              "MMM DD YYYY HH:mm:ss"
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "_chainSelector",
      header: "Destination Chain",
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-1">
            <picture>
              <img
                src={
                  chainSelectorList[String(row.getValue("_chainSelector"))].logo
                }
                alt={
                  chainSelectorList[String(row.getValue("_chainSelector"))].name
                }
                className="w-6"
              />
            </picture>
            <div>
              {chainSelectorList[String(row.getValue("_chainSelector"))].name}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "_beneficiary",
      header: "Beneficiary",
      cell: ({ row }) => {
        return (
          <div>
            <Popover>
              <PopoverTrigger className="underline font-medium">
                {truncateAddress(row.getValue("_beneficiary"))}
              </PopoverTrigger>
              <PopoverContent className="w-[440px] text-center">
                <div className="font-medium">
                  {row.getValue("_beneficiary")}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
    },
    {
      accessorKey: "blockNumber",
      header: "Block Number",
    },
    {
      accessorKey: "transactionHash",
      header: "Transaction Hash",
      cell: ({ row }) => {
        return (
          <div>
            <Popover>
              <PopoverTrigger className="underline font-medium">
                {truncateAddress(row.getValue("transactionHash"), 6)}
              </PopoverTrigger>
              <PopoverContent className="w-[440px]">
                <div className="font-medium break-words">
                  {row.getValue("transactionHash")}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
    },
    {
      accessorKey: "transactionHash",
      header: "Explorer",
      cell: ({ row }) => {
        return (
          <div>
            <a
              href={`${chain?.blockExplorers?.etherscan?.url}/tx/${row.getValue(
                "transactionHash"
              )}`}
              target="_blank"
            >
              <Button>View on Explorer</Button>
            </a>
          </div>
        );
      },
    },
  ];
};
