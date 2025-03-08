import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <TopNavbar />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
