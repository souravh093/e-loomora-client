import BannerPage from "@/components/shared/BannerPage";
import Container from "@/components/shared/Container";
import ProductCard from "@/components/shared/ProductCard";
import { IProduct } from "@/types/product.type";

const RecentViewed = () => {
  const recentViewedData = JSON.parse(
    localStorage.getItem("recentViewedProducts") || "[]"
  );
  return (
    <>
      <BannerPage title="Recent Viewed Products" />
      <Container className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
          {recentViewedData.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default RecentViewed;
