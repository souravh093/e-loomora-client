import { DashboardLayout } from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import Login from "@/pages/Auth/Login/Login";
import Signup from "@/pages/Auth/Signup/Signup";
import ProductCategory from "@/pages/Dashboard/Admin/ProductCategory/ProductCategory";
import TransactionsHistory from "@/pages/Dashboard/Admin/TransactionsHistory/TransactionsHistory";
import Users from "@/pages/Dashboard/Admin/Users/Users";
import VendorShop from "@/pages/Dashboard/Admin/VendorShop/VendorShop";
import DashboardHome from "@/pages/Dashboard/DashboardHome";
import CustomersReview from "@/pages/Dashboard/Vendor/CustomersReview/CustomersReview";
import Inventory from "@/pages/Dashboard/Vendor/Inventory/Inventory";
import OrderDetailsPage from "@/pages/Dashboard/Vendor/Orders/OrderDeatils/OrderDetails";
import Orders from "@/pages/Dashboard/Vendor/Orders/Orders";
import AddProduct from "@/pages/Dashboard/Vendor/ProductsManagement/AddProduct/AddProduct";
import EditProduct from "@/pages/Dashboard/Vendor/ProductsManagement/EditProduct/EditProduct";
import Error from "@/pages/Error/Error";
import ForgetPassword from "@/pages/ForgetPassword/ForgetPassword";
import Home from "@/pages/Home/Home";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import PrivateRoute from "@/private/PrivateRoute";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      // Admin Routes
      {
        path: "admin/user",
        element: <Users />,
      },
      {
        path: "admin/shop",
        element: <VendorShop />,
      },
      {
        path: "admin/categories",
        element: <ProductCategory />,
      },
      {
        path: "admin/transactions",
        element: <TransactionsHistory />,
      },

      // Vendor Routes
      {
        path: "vendor/products/add",
        element: <AddProduct />,
      },
      {
        path: `vendor/edit-product/:id`,
        element: <EditProduct />,
      },
      {
        path: "vendor/reviews",
        element: <CustomersReview />,
      },
      {
        path: "vendor/inventory",
        element: <Inventory />,
      },
      {
        path: "vendor/orders",
        element: <Orders />,
      },
      {
        path: "vendor/orders/details/:id",
        element: <OrderDetailsPage />,
      }
    ],
  },
]);

export default router;
