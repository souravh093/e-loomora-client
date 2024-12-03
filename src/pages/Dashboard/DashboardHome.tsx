import { Role } from "@/constant/role.constant";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import AdminHome from "./Admin/AdminHome/AdminHome";
import VendorHome from "./Vendor/VendorHome/VendorHome";
import CustomerHome from "./Customer/CustomerHome/CustomerHome";

const DashboardHome = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const role = currentUser ? currentUser.role : null;
  return (
    <>
      {role === Role.admin ? (
        <AdminHome />
      ) : role === Role.vendor ? (
        <VendorHome />
      ) : role === Role.user ? (
        <CustomerHome />
      ) : null}
    </>
  );
};

export default DashboardHome;
