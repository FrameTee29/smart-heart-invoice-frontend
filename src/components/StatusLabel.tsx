import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const statusLabelVariants = cva("text-white rounded-md font-semibold", {
  variants: {
    variant: {
      default: "bg-black",
      pending: "bg-[#F4BE4F]",
      overdue: "bg-[#D04E41]",
      paid: "bg-[#61C454]",
    },
    size: {
      default: "px-4 py-1 text-base",
      sm: "px-4 py-1 text-sm",
      lg: "px-4 py-1 text-lg",
      xl: "px-4 py-1 text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface StatusLabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusLabelVariants> {
  asChild?: boolean;
}

const StatusLabel = React.forwardRef<HTMLDivElement, StatusLabelProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(statusLabelVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

StatusLabel.displayName = "div";

export default StatusLabel;
