/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetShopByIdQuery } from "@/redux/api/features/shopApi";
import { useParams } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IProduct } from "@/types/product.type";
import ProductCard from "@/components/shared/ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import {
  useCheckFollowQuery,
  useCreateFollowMutation,
  useUnFollowShopMutation,
} from "@/redux/api/features/followsShopApi";
import { toast } from "@/hooks/use-toast";
import { FollowButton } from "@/components/ShopComponent/FollowButton";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const ShopProduct = () => {
  const { id } = useParams();
  const { data: shopData, isLoading } = useGetShopByIdQuery(id);

  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id ? user.id : "";
  const [followShop] = useCreateFollowMutation();
  const [unFollowShop] = useUnFollowShopMutation();

  const query = [
    {
      name: "shopId",
      value: id,
    },
    {
      name: "userId",
      value: userId,
    },
  ];

  const { data: checkFollowData } = useCheckFollowQuery(query);

  const handleFollowToggle = async () => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "You need to login to follow a shop",
      });
      return;
    }

    if (checkFollowData?.data?.userId === userId) {
      try {
        const response = await unFollowShop({
          id: checkFollowData?.data.id,
          shopId: id,
          userId: userId,
        }).unwrap();

        if (response.success) {
          toast({
            variant: "default",
            title: response.message,
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      }
    } else {
      try {
        const response = await followShop({
          shopId: id,
          userId: userId,
        }).unwrap();

        if (response.success) {
          toast({
            variant: "default",
            title: response.message,
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      }
    }
  };

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
            <p className="text-muted-foreground mb-4">
              {shopData?.data?.description}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Badge variant="secondary">
                {shopData?.data?.follower} Followers
              </Badge>
              <Badge variant="outline" className="capitalize">
                {shopData?.data?.status.toLowerCase()}
              </Badge>
              <FollowButton
                isFollowing={checkFollowData?.data?.id ? true : false}
                onClick={handleFollowToggle}
              />
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
      {isLoading && (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopProduct;
