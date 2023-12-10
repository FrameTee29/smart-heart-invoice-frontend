import { useRouter } from "next/router";

import { useStoreState } from "@/store";

import { Button } from "@/components/ui/button";

interface ITopBar {
  role: "admin" | "customer";
}

const TopBar = ({ role }: ITopBar) => {
  const router = useRouter();

  // User store
  const { isAdmin } = useStoreState((state) => state.user);

  return (
    <div className="flex justify-between mt-12 w-full">
      <div className="text-4xl font-semibold mb-6 text-black">
        <h1>Invoices</h1>
      </div>
      {isAdmin && role === "admin" && (
        <Button
          aria-label="Go to previous page"
          variant="outline"
          className="px-1 bg-primary text-background min-w-[164px] h-12"
          onClick={() => router.push("/admin/create-invoice")}
        >
          Create invoice
        </Button>
      )}
    </div>
  );
};

export default TopBar;
