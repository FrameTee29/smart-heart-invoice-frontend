// import { adminList } from "@/constants/admin.constant";
import { useStoreActions } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface IAuthProvider {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { address } = useAccount();

  const { setIsAdmin } = useStoreActions((state) => state.user);

  const checkIsAdmin = () => {
    // const isAdmin = adminList.includes(address?.toLocaleLowerCase() ?? "");
    const isAdmin = true;
    setIsAdmin(isAdmin);
  };

  useEffect(() => {
    // If not login yet, the system shall transition to landing page for connect wallet
    if (!address && router.pathname !== "/") {
      router.push("/");
    }

    if (address && router.pathname === "/") {
      router.push("/home");
    }

    if (address) {
      checkIsAdmin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (
    mounted === false ||
    (router.pathname === "/" && address) ||
    (router.pathname !== "/" && !address)
  ) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="animate-bounce text-primary font-semibold">
          Loading ...
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
