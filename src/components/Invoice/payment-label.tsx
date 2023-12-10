import { useMemo } from "react";

type Props = {
  typeStatus: string;
};
export function InvoiceLabel({ typeStatus }: Props) {
  const backgroundType = useMemo(() => {
    switch (typeStatus.toLocaleLowerCase()) {
      case "pending": {
        return "bg-warning";
      }
      case "paid": {
        return "bg-success";
      }
      case "overdue": {
        return "bg-error";
      }
      default: {
        return "bg-warning";
      }
    }
  }, [typeStatus]);

  const labelType = useMemo(() => {
    switch (typeStatus.toLocaleLowerCase()) {
      case "pending": {
        return "Pending";
      }
      case "paid": {
        return "Paid";
      }
      case "overdue": {
        return "Overdue";
      }
      default: {
        return "Pending";
      }
    }
  }, [typeStatus]);

  return (
    <div
      className={`flex max-w-[70px] w-full text-sm px-2 py-1 rounded-md  text-background justify-center ${backgroundType}`}
    >
      <div> {labelType}</div>
    </div>
  );
}
