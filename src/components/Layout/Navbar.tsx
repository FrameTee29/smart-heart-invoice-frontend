import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="shadow-black-format2 py-2">
      <div className="flex justify-between items-center container">
        <Link href="/home">
          <picture className="cursor-pointer">
            <img src={"/assets/logo.png"} className="w-56" alt="logo" />
          </picture>
        </Link>

        <div className="text-sm">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
