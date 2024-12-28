import Banner from "@/components/HomeComponent/Banner";
import CategorySection from "@/components/HomeComponent/CategorySection";
import FeaturesProduct from "@/components/HomeComponent/FeaturesProducts";
import FlashSale from "@/components/HomeComponent/FlashSale";
import PrioritizeProduct from "@/components/HomeComponent/PrioritizeProduct";
import ShowProduct from "@/components/HomeComponent/ShowProduct";
import Subscribe from "@/components/HomeComponent/Subscribe";
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
      <Subscribe />
      <CategorySection />
      <FlashSale />
      <ScrollToTopButton />
      {role === "USER" && <PrioritizeProduct />}
      <FeaturesProduct />
    </div>
  );
};

export default Home;
