import pdfService from "@/services/pdf.service";

interface IDownloadInvoiceDPF {
  children: React.ReactNode;
  invoiceNumber: string;
}

const DownloadInvoiceDPF = ({
  children,
  invoiceNumber,
}: IDownloadInvoiceDPF) => {
  const handleDownloadFile = async () => {
    if (invoiceNumber !== "") {
      try {
        const response = await pdfService.downloadPDF(invoiceNumber);
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${invoiceNumber}.pdf`;
        link.click();
      } catch (err) {
        console.log("Download Failed", err);
      }
    }
  };

  return (
    <div onClick={handleDownloadFile} className="cursor-pointer">
      {children}
    </div>
  );
};

export default DownloadInvoiceDPF;
