/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FollowButton } from "./FollowButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IShop } from "@/types/product.type";
import {
  useCheckFollowQuery,
  useCreateFollowMutation,
  useUnFollowShopMutation,
} from "@/redux/api/features/followsShopApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

export function ShopCard({ id, name, logoUrl, description, follower }: IShop) {
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

    if(!userId) {
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
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={logoUrl} alt={`${name} logo`} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{follower} followers</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <FollowButton
          isFollowing={checkFollowData?.data?.id ? true : false}
          onClick={handleFollowToggle}
        />
        <Link to={`/shop-products/${id}`} className="text-primary-foreground">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black flex items-center gap-2">
            <ShoppingBag />
            View Shop Products
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
