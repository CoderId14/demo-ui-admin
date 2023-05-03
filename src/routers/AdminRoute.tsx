import { AppConst } from "@/app-const";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  isAllowed: boolean;
  redirectPath?: string;
  children: JSX.Element;
}

function AdminRoute({
  isAllowed,
  children,
  redirectPath = AppConst.LOGIN_URL,
}: Props) {
  if (!isAllowed) {
    toast.warning("You must have admin permission to access");
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet></Outlet>;
}

export default AdminRoute;
