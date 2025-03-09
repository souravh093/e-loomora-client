import ChangePassword from "@/components/shared/ChangePassword";
import { DashboardLayout } from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import AllProducts from "@/pages/AllProducts/AllProducts";
import Login from "@/pages/Auth/Login/Login";
import Signup from "@/pages/Auth/Signup/Signup";
import CartPage from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import ProductCategory from "@/pages/Dashboard/Admin/ProductCategory/ProductCategory";
import Subscribe from "@/pages/Dashboard/Admin/Subscribe/Subscribe";
import TransactionsHistory from "@/pages/Dashboard/Admin/TransactionsHistory/TransactionsHistory";
import Users from "@/pages/Dashboard/Admin/Users/Users";
import VendorShop from "@/pages/Dashboard/Admin/VendorShop/VendorShop";
import CustomerOrder from "@/pages/Dashboard/Customer/CustomerOrder/CustomerOrder";
import PaymentUserHistory from "@/pages/Dashboard/Customer/PaymentUserHistory/PaymentUserHistory";
import DashboardHome from "@/pages/Dashboard/DashboardHome";
import Profile from "@/pages/Dashboard/Profile";
import Coupon from "@/pages/Dashboard/Vendor/Coupon/Coupon";
import CustomersReview from "@/pages/Dashboard/Vendor/CustomersReview/CustomersReview";
import Inventory from "@/pages/Dashboard/Vendor/Inventory/Inventory";
import OrderDetailsPage from "@/pages/Dashboard/Vendor/Orders/OrderDeatils/OrderDetails";
import Orders from "@/pages/Dashboard/Vendor/Orders/Orders";
import AddProduct from "@/pages/Dashboard/Vendor/ProductsManagement/AddProduct/AddProduct";
import EditProduct from "@/pages/Dashboard/Vendor/ProductsManagement/EditProduct/EditProduct";
import ShopManagement from "@/pages/Dashboard/Vendor/ShopManagement/ShopManagement";
import Error from "@/pages/Error/Error";
import FlashSaleProducts from "@/pages/FlashSaleProducts/FlashSaleProducts";
import ForgetPassword from "@/pages/ForgetPassword/ForgetPassword";
import Home from "@/pages/Home/Home";
import Payment from "@/pages/Payment/Payment";
import { ProductComparison } from "@/pages/ProductComparision/ProductComparision";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import RecentViewed from "@/pages/RecentViewed/RecentViewed";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import Shop from "@/pages/Shop/Shop";
import ShopProduct from "@/pages/ShopProduct/ShopProduct";
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
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/shops",
        element: <Shop />,
      },
      {
        path: "/shop-products/:id",
        element: <ShopProduct />,
      },
      {
        path: "/comparison",
        element: <ProductComparison />,
      },
      {
        path: "/discount-products",
        element: <FlashSaleProducts />,
      },
      {
        path: "/recent-viewed",
        element: <RecentViewed />,
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
      {
        path: "profile",
        element: <Profile />,
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
      {
        path: "admin/change-password",
        element: <ChangePassword />,
      },
      {
        path: "admin/subscribe",
        element: <Subscribe />,
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
      },
      {
        path: "vendor/coupons",
        element: <Coupon />,
      },
      {
        path: "vendor/shop-management",
        element: <ShopManagement />,
      },
      {
        path: "vendor/change-password",
        element: <ChangePassword />,
      },

      // Customer Routes
      {
        path: "user/orders",
        element: <CustomerOrder />,
      },
      {
        path: "user/orders/details/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "user/payment-history",
        element: <PaymentUserHistory />
      },
      {
        path: "user/change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);

export default router;
