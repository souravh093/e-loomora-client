import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetProductByIdQuery } from "@/redux/api/features/productApi";
import { Link, useParams } from "react-router";
import { IProductImage, IReview } from "@/types/product.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "@/hooks/use-toast";
import { addItem } from "@/redux/api/features/cartSlice";
import CategoryProduct from "./CategoryProduct/CategoryProduct";
import { CustomerReviewForm } from "@/components/CustomerReview/CustomerReview";
import { useGetOrderByUserIdQuery } from "@/redux/api/features/orderApi";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { Star } from "lucide-react";
import recentViewedProduct from "@/utils/addToRecentViewed";

export default function ProductDetails() {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser ? currentUser.id : null;
  const { id } = useParams();
  const { data: productDetails } = useGetProductByIdQuery(id);

  const query = [
    {
      name: "userId",
      value: userId,
    },
    {
      name: "productId",
      value: id,
    },
  ];

  const { data: orderData } = useGetOrderByUserIdQuery(query);

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.items);
  const addToCart = () => {
    for (const item of cartProducts) {
      if (item.shopId !== productDetails?.data.shopId) {
        toast({
          variant: "destructive",
          description: "Replace the cart with the new product",
        });
        return;
      }
    }

    const cart = {
      id: productDetails?.data.id,
      name: productDetails?.data.name,
      shopId: productDetails?.data.shopId,
      price: productDetails?.data.price,
      image: productDetails?.data?.productImage?.[0]?.url ?? "",
      stockQuantity: productDetails?.data.inventoryCount,
    };

    dispatch(addItem(cart));

    toast({
      variant: "default",
      description: "Product added to cart",
    });
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

  const discountedPrice = productDetails?.data.discount
    ? productDetails?.data.price -
      (productDetails?.data.price * productDetails?.data.discount) / 100
    : productDetails?.data.price;

  if (productDetails?.data && productDetails?.data.id) {
    recentViewedProduct(productDetails?.data);
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {productDetails?.data?.productImage?.map(
                (src: IProductImage, index: number) => (
                  <CarouselItem key={index}>
                    <img
                      src={src.url}
                      alt={`Product image ${index + 1}`}
                      className="rounded-lg h-96 w-full object-cover"
                    />
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <Card>
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2">
              {productDetails?.data?.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge>{productDetails?.data?.category?.name}</Badge>
              <Link to={`/shop-products/${productDetails?.data?.shop?.id}`} className="text-muted-foreground">
                by {productDetails?.data?.shop?.name}
              </Link>
            </div>
            <div className="flex items-center">
              {renderStars(productDetails?.data?.avgRating)}
              <span className="ml-1 text-sm text-gray-600">
                ({productDetails?.data?.review.length})
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-primary">
                ৳{discountedPrice}
              </p>
              {productDetails?.data?.discount && (
                <p className="text-sm text-gray-500 line-through">
                  ৳{productDetails?.data?.price}
                </p>
              )}
            </div>
            <p className="mb-4">{productDetails?.data?.description}</p>
            <p className="mb-4">
              In stock: {productDetails?.data?.inventoryCount}
            </p>
            <Button
              onClick={addToCart}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>

      <CategoryProduct id={id} categoryId={productDetails?.data?.categoryId} />

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Customer Review</h2>

        <div className="flex flex-col gap-2">
          {productDetails?.data?.review.map((review: IReview) => (
            <div key={review.id} className="flex items-center gap-3 w-full">
              <img
                src={review.user.image}
                alt="user image"
                className="h-32 w-32 rounded-full object-cover"
              />
              <div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{review.user.name}</span>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p>{review.content}</p>
                </div>
                {review.replayReview.length > 0 && (
                  <div className="flex items-center gap-2 ml-10">
                    <span className="font-bold">Replay Review: </span>
                    {review.replayReview.map((review) => (
                      <div key={review.id}>{review.content}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {orderData?.data?.status === "COMPLETED" && (
        <div className="my-10">
          <CustomerReviewForm productId={id} />
        </div>
      )}
    </div>
  );
}
