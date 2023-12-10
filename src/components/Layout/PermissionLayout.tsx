import { useStoreState } from "@/store";

import NoPermission from "../NoPermission";

interface IPermissionLayout {
  children: React.ReactNode;
}

const PermissionLayout = ({ children }: IPermissionLayout) => {
  // User store
  const { isAdmin } = useStoreState((state) => state.user);

  return <>{isAdmin ? children : <NoPermission />}</>;
};

export default PermissionLayout;
