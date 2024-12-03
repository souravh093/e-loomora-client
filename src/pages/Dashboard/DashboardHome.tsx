import { Role } from "@/constant/role.constant";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import AdminHome from "./Admin/AdminHome/AdminHome";
import VendorHome from "./Vendor/VendorHome/VendorHome";
import CustomerHome from "./Customer/CustomerHome/CustomerHome";
import { useGetShopByUserIdQuery } from "@/redux/api/features/shopApi";
import CreateShop from "./Vendor/CreateShop/CreateShop";

const DashboardHome = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const role = currentUser ? currentUser.role : null;
  const id = currentUser ? currentUser.id : null;
  const { data: shopData } = useGetShopByUserIdQuery(id);
  return (
    <>
      {role === Role.admin ? (
        <AdminHome />
      ) : role === Role.vendor && shopData?.data === null ? (
        <CreateShop />
      ) : role === Role.vendor ? (
        <VendorHome />
      ) : role === Role.user ? (
        <CustomerHome />
      ) : null}
    </>
  );
};

export default DashboardHome;
