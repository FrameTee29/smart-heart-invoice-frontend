import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@radix-ui/react-label";
import { Eye } from "lucide-react";
import { Payment } from "@/components/Invoice/columns";
import { formatDateInvoice } from "@/utils/formatDate";

import { saveAs } from "file-saver";
import { Invoice } from "@/interfaces/invoice.interface";
import Link from "next/link";

type Props = {
  data: Invoice;
};

export function DialogDetail({ data }: Props) {
  const backendURL = process.env.NEXT_PUBLIC_INVOICE_SERVICE_URL || "";

  const dateInvoice = formatDateInvoice(data.createdAt ?? "");

  const handleDownload = async (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    let { id } = event.target as HTMLElement;
    if (id !== "") {
      const response = await fetch(`${backendURL}/pdf/download/${id}`);
      const blob = await response.blob();
      saveAs(blob, `${id}.pdf`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] p-12 ">
        <div className="grid grid-cols-2 pt-4">
          <div className="">
            <div className="font-light text-[10px] text-[#808181] opacity-80">
              Invoice from Smart Heart Company
            </div>
            <div className="font-semibold text-[36px] text-[#4D4C4C]">
              10.0 USDC
            </div>
            <div className="font-light text-[14px] text-[#4D4C4C]">
              {dateInvoice}
            </div>
            <div className="font-light text-[10px] text-[#808181] opacity-80">
              Invoice number : {data.invoiceNumber}
            </div>

            <div className="flex flex-row items-end justify-start pt-8">
              <Label className="font-light text-[16px] text-[#808181] opacity-70">
                To
              </Label>
              <Label className="font-normal text-[14px] text-[#4D4C4C] pl-8">
                {data?.customer?.name}
              </Label>
            </div>
            <div className="flex flex-row items-end justify-start pt-5">
              <Label className="font-light text-[16px] text-[#808181] opacity-70">
                From
              </Label>
              <Label className="flex items-center font-normal text-[14px] text-[#4D4C4C] pl-3">
                Smart Heart Company
              </Label>
            </div>
          </div>
          <div className="items-center justify-center pt-6 bg">
            <div className="flex justify-center items-center">
              <picture>
                <img
                  alt="download_file"
                  src={"/assets/invoice/DownloadFile.png"}
                  className=" w-[99px] mt-0 image-shadow justify-items-center"
                  id={data.invoiceNumber}
                  onClick={(e) => handleDownload(e)}
                />
              </picture>
            </div>
            <div className="leading-6 relative text-[7px] text-[#808181] text-center">
              Dowload invoice
            </div>
          </div>
        </div>
        <div className="inline-flex items-start w-full pt-4 pb-10">
          <div className="w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        <DialogFooter>
          <Link href={`/invoice/${data.invoiceNumber}`}>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-[48px] w-full px-1 bg-primary text-background min-w-[164px]"
            >
              Pay this invoice
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
