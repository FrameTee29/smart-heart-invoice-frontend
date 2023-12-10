import InvoiceDetailPage from "@/views/Invoice/Invoice-detail";

interface IInvoicePay {
  invoiceNumber: string;
}

const InvoiceDetail = ({ invoiceNumber }: IInvoicePay) => (
  <InvoiceDetailPage invoiceNumber={invoiceNumber} />
);

export async function getServerSideProps(context: {
  query: { invoiceNumber: string };
}) {
  const invoiceNumber = context.query.invoiceNumber ?? "";

  return { props: { invoiceNumber } };
}

export default InvoiceDetail;
