import BannerPage from "@/components/shared/BannerPage";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import { ShopCard } from "@/components/ShopComponent/ShopCard";
import { useGetShopsQuery } from "@/redux/api/features/shopApi";
import { IShop } from "@/types/product.type";

const Shop = () => {
  const { data: shops, isLoading } = useGetShopsQuery(undefined);
  return (
    <>
    <BannerPage title="Shops" />
    <div className="container mx-auto py-8 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shops?.data?.length < 1 ? (
          <p>No shop found</p>
        ) : isLoading ? (
          <SkeletonLoading />
        ) : (
          shops?.data?.map((shop: IShop) => (
            <ShopCard key={shop.id} {...shop} />
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default Shop;
