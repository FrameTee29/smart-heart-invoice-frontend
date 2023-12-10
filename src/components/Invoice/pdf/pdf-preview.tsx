// import pdfHeader from '@/assets/invoice/pdf-header.jpg';
// import pdfFooter from '@/assets/invoice/pdf-footer.jpg';
// import pdfArrow from '@/assets/invoice/arrow.png';
import dayjs from "dayjs";
import { IInvoice, IItemDescription } from "@/constants/invoice.interface";
import Image from "next/image";

type Props = {
  data: IInvoice;
  // data: any
};

export function PdfPreview({ data }: Props) {
  return (
    <>
      <div className="border-[1px]">
        <div className="relative">
          <div className="z-10 absolute bottom-0 right-0 pr-5 uppercase text-4xl">
            INVOICE
          </div>
          <div className="w-full">
            <picture>
              <img
                src={"/assets/invoice/PdfHeader.jpg"}
                className="w-full"
                alt="pdf-header"
              />
            </picture>
          </div>
        </div>
        <div>
          <div className="text-xs leading-6 h-6 mt-6 mb-4">
            <div className="w-[40%] inline-block text-xs float-left pt-2 pr-4">
              <picture>
                <img src={"/assets/invoice/Arrow.png"} className="w-full" alt="arrow"/>
              </picture>
            </div>
            <div className="w-[60%] inline-block text-xs float-right bg-lightBlue rounded-s-full">
              <div className="w-[50%] float-right leading-6">
                invoice: {data.invoiceNumber}
              </div>
              <div className="w-[50%] float-right leading-6 pl-3">
                Date {dayjs(data.createDate).format("DD/MM/YYYY")}
              </div>
            </div>
          </div>
          <div className="inline-block">
            <div className="w-[60%] px-8 text-[8px]">
              <p className="text-xs">Invoice to:</p>
              <p>{data.payerName}</p>
              <p>{data.payerAddress}</p>
              <p>{data.payerEmail}</p>
            </div>
          </div>
          <div className="mt-[30px] px-5 text-[10px]">
            <div className="w-full bg-primary inline-block text-background rounded-full">
              <div className="w-[50%] float-left pl-2">Item Description</div>
              <div className="w-[10%] float-left text-center">Qty</div>
              <div className="w-[20%] float-left text-center">Rate</div>
              <div className="w-[20%] float-left text-right pr-2">Amount</div>
            </div>
            {data.items.map((item: IItemDescription, index: number) => {
              return (
                <div className="w-full inline-block" key={index}>
                  <div className="w-[50%] float-left pl-2">
                    {item.description}
                  </div>
                  <div className="w-[10%] float-left text-center">
                    {item.quantity}
                  </div>
                  <div className="w-[20%] float-left text-center">
                    {item.price} {data.tokenSymbol}
                  </div>
                  <div className="w-[20%] float-left text-right pr-2">
                    {item.amount} {data.tokenSymbol}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-[100px] px-5">
            <div className="w-full inline-block">
              <div className="w-[50%] float-left text-[10px]">
                <p className="text-xs">Terms & Conditions</p>
                <p>Please pay within 15 days of receiving this invoice.</p>
                <p>Due {dayjs(data.dueDate).format("DD/MM/YYYY")}</p>
              </div>
              <div className="w-[50%] float-left">
                <div>
                  <div className="w-full inline-block text-xs">
                    <div className="w-[50%] float-left text-right">
                      Sub Total
                    </div>
                    <div className="w-[50%] float-left text-right pr-2">
                      {data.subTotal} {data.tokenSymbol}
                    </div>
                  </div>
                  <div className="w-full inline-block text-xs">
                    <div className="w-[50%] float-left text-right">Total</div>
                    <div className="w-[50%] float-left text-right pr-2">
                      {data.total} {data.tokenSymbol}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="w-full">
            {/* <Image
            src={"/assets/invoice/pdf-footer.jpg"}
            alt="smart-heart-invoice-logo"
            priority={true}
          /> */}
            <img src={"/assets/invoice/PdfFooter.jpg"} className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
