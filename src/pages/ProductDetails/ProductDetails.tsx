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
import { useParams } from "react-router";
import { IProductImage } from "@/types/product.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "@/hooks/use-toast";
import { addItem } from "@/redux/api/features/cartSlice";
import CategoryProduct from "./CategoryProduct/CategoryProduct";
import { CustomerReviewForm } from "@/components/CustomerReview/CustomerReview";
import { useGetOrderByUserIdQuery } from "@/redux/api/features/orderApi";
import { selectCurrentUser } from "@/redux/api/features/authSlice";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {productDetails?.data?.productImage?.map(
                (src: IProductImage, index: number) => (
                  <CarouselItem key={index}>
                    <img
                      src={src.url}
                      alt={`Product image ${index + 1}`}
                      className="rounded-lg h-64 w-96 object-cover"
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
              <span className="text-muted-foreground">
                by {productDetails?.data?.shop?.name}
              </span>
            </div>
            <p className="text-2xl font-semibold mb-4">
              ৳{productDetails?.data?.price.toFixed(2)}
            </p>
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

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Related Products</h2>

        <CategoryProduct
          id={id}
          categoryId={productDetails?.data?.categoryId}
        />
      </div>

      {orderData?.data?.status === "COMPLETED" && (
        <div className="my-10">
          <CustomerReviewForm productId={id} />
        </div>
      )}
    </div>
  );
}
