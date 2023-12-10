import Link from "next/link";
import { Button } from "../ui/button";
import {
  HistoryIcon,
  ListIcon,
  PlusIcon,
  UserCircleIcon,
  WalletIcon,
} from "lucide-react";

const AdminNavbar = () => {
  const adminMenu = [
    {
      slug: "/admin/home",
      label: "Invoice List",
      variant: "menuOutline",
      icon: <ListIcon className="w-[20px]" />,
    },
    {
      slug: "/admin/create-invoice",
      label: "Create Invoice",
      variant: "menuOutline",
      icon: <PlusIcon className="w-[20px]" />,
    },
    {
      slug: "/admin/create-customer",
      label: "Create Customer",
      variant: "menuOutline",
      icon: <UserCircleIcon className="w-[20px]" />,
    },
    {
      slug: "/admin/claim/history",
      label: "Claim Automation History",
      variant: "menuOutline",
      icon: <HistoryIcon className="w-[20px]" />,
    },
    {
      slug: "/admin/claim",
      label: "Claim",
      variant: "menu",
      icon: <WalletIcon className="w-[20px]" />,
    },
    // { slug: "/admin/chainlink", label: "Chainlink" },
  ];

  return (
    <div className="space-x-3">
      {adminMenu.map((item) => {
        return (
          <Link key={item.slug} href={item.slug}>
            <Button
              variant={item.variant as any}
              className="space-x-2 text-base rounded-lg px-2"
              size="menu"
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminNavbar;
