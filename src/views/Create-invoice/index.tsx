import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import httpClient from "@/utils/httpClient";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/toast/use-toast";

import { initialInvoiceData } from "@/constants/invoice.constant";

import MainLayout from "@/components/Layout/MainLayout";
import { PdfPreview } from "@/components/Invoice/pdf/pdf-preview";
import { IInvoice, IItemDescription } from "@/constants/invoice.interface";
import { IChain, IToken } from "@/constants/payment-enum";
import { chainPayer } from "@/constants/admin.constant";
import { useStoreState } from "@/store";
import PermissionLayout from "@/components/Layout/PermissionLayout";
import { useRouter } from "next/router";

const formSchema = z.object({
  invoiceNumber: z.string().min(1, {
    message: "Invoicee cannnot empty",
  }),
  // description: z.string().min(2, {
  //   message: 'Description cannnot empty',
  // }),
  // price: z.number().gt(0),
  // quantity: z.number().gt(0),
  // customer: z.string({ required_error: "Please select an email to display." }),
});

const CreateInvoicePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: "Auto generate",

      // description: '',
      // price: 0,
      // quantity: 0,
      // customer: '',
    },
  });
  const { toast } = useToast();

  // User store
  const { isAdmin } = useStoreState((state) => state.user);

  const backendURL = process.env.NEXT_PUBLIC_INVOICE_SERVICE_URL || "";

  const [tokenSupport, setTokenSupport] = useState<IToken[]>([]);
  const [invoiceData, setInvoiceData] = useState<IInvoice>(initialInvoiceData);
  const [itemInvoice, setItemInvoice] = useState<IItemDescription[]>([
    { description: "", quantity: 0, price: 0, amount: 0 },
  ]);
  const [customerData, setCustomerData] = useState<ICustomer[]>([]);
  const [dueDate, setDuedate] = useState<string>(dayjs().format("YYYY-MM-DD"));

  const onSubmit = () =>
    // values: z.infer<typeof formSchema>
    {
      onOverlay();
      const submitData = {
        invoiceNumber: invoiceData.invoiceNumber,
        customerUuid: invoiceData.customerUuid,
        dueDate: invoiceData.dueDate,
        paymentName: invoiceData.payerName,
        chainId: invoiceData.chainId,
        tokenName: invoiceData.tokenSymbol,
        tokenSymbol: invoiceData.tokenSymbol,
        tokenAddress: invoiceData.tokenAddress,
        total: invoiceData.total,
        items: invoiceData.items,
      };

      console.log(submitData);

      const baseURL = `${backendURL}/invoices/create`;

      const initApi = httpClient(baseURL);
      initApi
        .post(baseURL, submitData)
        .then(() => {
          toast({
            variant: "success",
            title: "Create invoice success",
            description: "Your invoice are created success",
          });

          router.push("/admin/home");

          //   //REDIRECT
        })
        .finally(() => {
          offOverlay();
        });
    };

  const handleAddItemInvoice = () => {
    setItemInvoice([
      ...itemInvoice,
      { description: "", quantity: 0, price: 0, amount: 0 },
    ]);
  };

  const handleItemChange = (
    event: { target: HTMLInputElement },
    index: number
  ) => {
    let { name, value } = event.target;
    let itemInvoiceTmp: IItemDescription[] = [...itemInvoice];
    if (itemInvoiceTmp[index]) {
      switch (name) {
        case "description":
          itemInvoiceTmp[index].description = value;
          break;
        case "quantity":
          itemInvoiceTmp[index].quantity = +value;
          break;
        case "price":
          itemInvoiceTmp[index].price = +value;
          break;
      }
    }

    itemInvoiceTmp[index].amount =
      itemInvoiceTmp[index]["quantity"] * itemInvoiceTmp[index]["price"];

    const invoiceDataTmp = invoiceData;
    setItemInvoice([...itemInvoiceTmp]);
    invoiceDataTmp.items = itemInvoiceTmp;
    setInvoiceData({ ...invoiceDataTmp });
    calInvoiceTotal();
  };

  const handleChange = (event: string, index: string) => {
    const selectData = invoiceData;
    switch (index) {
      case "invoiceNumber":
        selectData.invoiceNumber = event;
        break;

      case "chainId":
        selectData.chainId = event;

        chainPayer.forEach((chain: IChain) => {
          if (event === chain.chainId) setTokenSupport(chain.token);
        });
        break;

      case "dueDate":
        const dueDateResult = dayjs().add(+event, "day").format("YYYY-MM-DD");
        selectData.dueDate = dueDateResult;
        setDuedate(dueDateResult);
        break;
    }

    setInvoiceData({ ...selectData });
  };

  const handleTokenChange = (event: string) => {
    tokenSupport.forEach((token) => {
      if (token.tokenAddress === event) {
        setInvoiceData({
          ...invoiceData,
          ...{
            tokenAddress: token.tokenAddress,
            tokenSymbol: token.tokenSymbol,
            tokenName: token.tokenName,
          },
        });
      }
    });
  };

  const handleCustomerChange = (e: string) => {
    customerData.forEach((customer) => {
      if (customer.uuid === e) {
        const selectCustomer = {
          ...invoiceData,
          ...{
            customerUuid: customer.uuid,
            payerName: customer.name,
            payerAddress: customer.address,
            payerEmail: customer.email,
          },
        };

        setInvoiceData({ ...selectCustomer });
      }
    });
  };

  const calInvoiceTotal = () => {
    let itemCal = 0;
    invoiceData.items.forEach(function (item) {
      if (item.amount) {
        itemCal += item.amount;
      }
    });
    setInvoiceData({
      ...invoiceData,
      ...{ subTotal: itemCal, total: itemCal },
    });
  };

  const onOverlay = () => {
    (document as any).getElementById("overlay").style.display = "block";
  };

  const offOverlay = () => {
    (document as any).getElementById("overlay").style.display = "none";
  };

  // Fetch customer
  useEffect(() => {
    let displayDataApi: ICustomer[] = [];

    const baseURL = `${backendURL}/customers/list`;
    const initApi = httpClient(baseURL);
    initApi
      .get(baseURL)
      .then((response) => {
        if (response && response.data.data) {
          response.data.data.map((customer: ICustomer) => {
            const customerTmp: ICustomer = {
              uuid: customer.uuid,
              name: customer.name,
              email: customer.email,
              organization: customer.organization,
              address: customer.address,
            };
            displayDataApi.push(customerTmp);
            setCustomerData([...displayDataApi]);
          });
        }
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <PermissionLayout>
        <div id="overlay" onClick={offOverlay}>
          {/* <div>Close</div> */}
          <div className="flex w-full h-screen items-center justify-center">
            <div className="font-bold text-2xl text-white animate-bounce">
              Loading . . .
            </div>
          </div>
        </div>

        <div className="container mx-auto py-10">
          <div className="flex justify-between mt-12 w-full">
            <div>
              <div className="text-4xl font-semibold mb-6 text-black">
                <h1>Create invoice</h1>
              </div>
            </div>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex justify-between mt-12 gap-4 md:gap-12 mb-8">
                  <div className="md:basis-2/3">
                    <div className="border-b-[1px] pb-8">
                      <p className="text-base font-bold pb-4">Customer</p>
                      <div>
                        {/* <FormField
                        control={form.control}
                        name="customer"
                        render={({ field }) => ( */}
                        <FormItem>
                          <FormControl>
                            <Select
                              name="customer"
                              onValueChange={(event) =>
                                handleCustomerChange(event)
                              }
                              defaultValue={""}
                            >
                              <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select a customer" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {customerData.map((customer) => {
                                    return (
                                      <SelectItem
                                        key={customer.uuid}
                                        value={customer.uuid}
                                      >
                                        {customer.name}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        {/* )}
                      /> */}
                      </div>
                    </div>
                    <div className="border-b-[1px] py-8">
                      <p className="text-base font-bold pb-5">
                        Invoice details
                      </p>
                      <div className="w-full inline-block mb-2">
                        <div className="w-full md:w-[20%] float-left leading-10">
                          Invoice number
                        </div>
                        <div className="w-full md:w-[25%] float-left">
                          <FormField
                            control={form.control}
                            name="invoiceNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    name="invoiceNumber"
                                    placeholder="Auto generate "
                                    disabled={true}
                                    onBlur={(e) =>
                                      handleChange(
                                        e.currentTarget.value,
                                        "invoiceNumber"
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full md:w-[40%] float-left">
                          <div className="w-full md:w-[25%] float-left px-2 text-right leading-10">
                            Due in
                          </div>
                          <div className="w-full md:w-[75%] float-left">
                            <Select
                              name="dueDate"
                              onValueChange={(e) => handleChange(e, "dueDate")}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Due in" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="7">7</SelectItem>
                                <SelectItem value="14">14</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="w-full md:w-[15%] float-left leading-10">
                          {dayjs(dueDate).format("DD MMM YYYY")}
                        </div>
                      </div>
                      <div className="w-full inline-block mb-2">
                        <div className="w-full md:w-[25%] float-left leading-10">
                          Payment Method
                        </div>
                        <div className="w-full md:w-[75%] float-left">
                          <Select
                            name="chainId"
                            onValueChange={(event) =>
                              handleChange(event, "chainId")
                            }
                          >
                            <SelectTrigger className="w-[280px]">
                              <SelectValue placeholder="Select a chain" />
                            </SelectTrigger>
                            <SelectContent>
                              {/* <SelectGroup> */}
                              {chainPayer.map((chain: IChain) => {
                                return (
                                  <SelectItem
                                    value={chain.chainId}
                                    key={chain.chainId}
                                  >
                                    <div className="flex items-center space-x-2 ">
                                      <picture>
                                        <img
                                          className="w-5"
                                          src={`/assets/chains/${chain.logo}.png`}
                                          alt={chain.logo}
                                        />
                                      </picture>
                                      <span>{chain.chainName}</span>
                                    </div>
                                  </SelectItem>
                                );
                              })}
                              {/* </SelectGroup> */}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="w-full inline-block">
                        <div className="w-full md:w-[25%] float-left leading-10">
                          Receive payments in
                        </div>
                        <div className="w-full md:w-[75%] float-left">
                          <Select
                            name="tokenAddress"
                            onValueChange={(event) => handleTokenChange(event)}
                          >
                            <SelectTrigger className="w-[280px]">
                              <SelectValue placeholder="Select a token" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {tokenSupport.map((token) => {
                                  return (
                                    <SelectItem
                                      value={token.tokenAddress}
                                      key={token.tokenAddress}
                                    >
                                      <div className="flex items-center space-x-2 ">
                                        <picture>
                                          <img
                                            className="w-5"
                                            src={`/assets/tokens/${token.logo}.png`}
                                            alt={token.logo}
                                          />
                                        </picture>
                                        <span>{token.tokenSymbol}</span>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="border-b-[1px] py-8">
                      <p className="text-base font-bold pb-5">Items</p>
                      <div className="w-full inline-block">
                        <div className="w-full md:w-[40%] float-left">Item</div>
                        <div className="w-full md:w-[25%] float-left px-4">
                          Qty
                        </div>
                        <div className="w-full md:w-[35%] float-left">
                          Price
                        </div>
                      </div>
                      {itemInvoice.map((_, index) => (
                        <div className="w-full mt-3 inline-block" key={index}>
                          <div className="w-full md:w-[40%] float-left">
                            <FormItem>
                              <FormControl>
                                <Input
                                  name="description"
                                  onChange={(event) =>
                                    handleItemChange(event, index)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </div>
                          <div className="w-full md:w-[25%] float-left px-4">
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  name="quantity"
                                  onBlur={(event) =>
                                    handleItemChange(event, index)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </div>
                          <div className="w-full md:w-[35%] float-left">
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="string"
                                  name="price"
                                  onBlur={(event) =>
                                    handleItemChange(event, index)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </div>
                        </div>
                      ))}
                      <div className="w-full mt-3 inline-block">
                        <div className="w-full md:w-[40%] float-left text-primary">
                          <div
                            onClick={() => handleAddItemInvoice()}
                            className="cursor-pointer"
                          >
                            + Add Item
                          </div>
                        </div>
                        <div>
                          <div className="w-full md:w-[25%] float-left px-4">
                            Subtotal
                          </div>
                          <div className="w-full md:w-[35%] float-left text-right">
                            {invoiceData.subTotal > 0 ? (
                              <span>
                                {invoiceData.subTotal} {invoiceData.tokenSymbol}
                              </span>
                            ) : (
                              <span>0 {invoiceData.tokenSymbol}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b-[1px] py-8 text-right">
                      <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        className="px-6 bg-ghost text-foreground h-10 mr-2"
                        type="button"
                        onClick={() => router.push("/admin")}
                      >
                        Cancel
                      </Button>
                      <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        className="px-7 bg-primary text-background h-10"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className="md:basis-1/3">
                    <PdfPreview data={invoiceData} />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PermissionLayout>
    </MainLayout>
  );
};

export default CreateInvoicePage;
