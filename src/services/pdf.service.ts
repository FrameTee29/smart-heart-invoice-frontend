import httpClient from "@/utils/httpClient";

const downloadPDF = async (invoiceNumber: string) => {
  const path = `/pdf/download/${invoiceNumber}`;
  return await httpClient().get(path, { responseType: "blob" });
};

const pdfService = { downloadPDF };

export default pdfService;
