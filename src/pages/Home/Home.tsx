import Banner from "@/components/HomeComponent/Banner";
import FlashSale from "@/components/HomeComponent/FlashSale";
import PrioritizeProduct from "@/components/HomeComponent/PrioritizeProduct";
import ShowProduct from "@/components/HomeComponent/ShowProduct";
import ScrollToTopButton from "@/components/shared/ScrollTopToBottom";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { useAppSelector } from "@/redux/hooks";

const Home = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const role = currentUser ? currentUser.role : null;
  return (
    <div>
      <Banner />
      <ShowProduct />
      <FlashSale />
      <ScrollToTopButton />
      {role === "USER" && <PrioritizeProduct />}
    </div>
  );
};

export default Home;
