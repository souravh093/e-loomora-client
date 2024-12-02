import { DashboardLayout } from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import Login from "@/pages/Auth/Login/Login";
import Signup from "@/pages/Auth/Signup/Signup";
import Error from "@/pages/Error/Error";
import ForgetPassword from "@/pages/ForgetPassword/ForgetPassword";
import Home from "@/pages/Home/Home";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
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
    element: <DashboardLayout />,
    errorElement: <Error />,
  },
]);

export default router;
