import { useGetShopByIdQuery } from "@/redux/api/features/shopApi";
import { useParams } from "react-router";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IProduct } from "@/types/product.type";
import ProductCard from "@/components/shared/ProductCard";

const ShopProduct = () => {
  const { id } = useParams();
  const { data: shopData } = useGetShopByIdQuery(id);

  console.log(shopData)
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          <img
            src={shopData?.data?.logoUrl}
            alt={shopData?.data?.name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{shopData?.data?.name}</h1>
            <p className="text-muted-foreground mb-4">{shopData?.data?.description}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Badge variant="secondary">{shopData?.data?.follower} Followers</Badge>
              <Badge variant="outline" className="capitalize">
                {shopData?.data?.status.toLowerCase()}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={shopData?.data?.owner.image}
              alt={shopData?.data?.owner.name}
              width={64}
              height={64}
              className="rounded-full mb-2"
            />
            <p className="text-sm font-medium">{shopData?.data?.owner.name}</p>
            <p className="text-xs text-muted-foreground">Shop Owner</p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shopData?.data?.product?.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopProduct;
