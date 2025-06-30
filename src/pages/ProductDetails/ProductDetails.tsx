"use client";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  Truck,
  ShieldCheck,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import { useGetProductByIdQuery } from "@/redux/api/features/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "@/hooks/use-toast";
import { addItem } from "@/redux/api/features/cartSlice";
import CategoryProduct from "./CategoryProduct/CategoryProduct";
import { CustomerReviewForm } from "@/components/CustomerReview/CustomerReview";
import { useGetOrderByUserIdQuery } from "@/redux/api/features/orderApi";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import recentViewedProduct from "@/utils/addToRecentViewed";
import type { IProductImage, IReview } from "@/types/product.type";

export default function ProductDetails() {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser ? currentUser.id : null;
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { data: productDetails, isLoading } = useGetProductByIdQuery(id);

  const query = [
    { name: "userId", value: userId },
    { name: "productId", value: id },
  ];

  const { data: orderData } = useGetOrderByUserIdQuery(query);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.items);

  const discountedPrice = productDetails?.data.discount
    ? productDetails?.data.price -
      (productDetails?.data.price * productDetails?.data.discount) / 100
    : productDetails?.data.price;

  useEffect(() => {
    if (productDetails?.data && productDetails?.data.id) {
      recentViewedProduct(productDetails?.data);
    }
  }, [productDetails?.data]);

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
      price: discountedPrice,
      image: productDetails?.data?.productImage?.[0]?.url ?? "",
      stockQuantity: productDetails?.data.inventoryCount,
      quantity,
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

  const handleIncreaseQuantity = () => {
    if (quantity < (productDetails?.data?.inventoryCount || 1)) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      toast({
        variant: "destructive",
        description: "Cannot exceed available stock",
      });
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const shortDescription = productDetails?.data?.description
    ? productDetails.data.description.substring(0, 100) +
      (productDetails.data.description.length > 100 ? "..." : "")
    : "";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productDetails?.data?.name,
        text: productDetails?.data?.description,
        url: window.location.href,
      });
    } else {
      toast({
        variant: "destructive",
        description: "Web Share API not supported in your browser",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">
          {productDetails?.data?.name || "Product Details"}
        </span>
      </div>

      {/* Product Main Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {isLoading ? (
            <Skeleton className="w-full aspect-square rounded-xl" />
          ) : (
            <>
              <div className="relative overflow-hidden rounded-xl bg-gray-50 border">
                <img
                  src={
                    productDetails?.data?.productImage?.[activeImageIndex]
                      ?.url ?? ""
                  }
                  alt={`${productDetails?.data?.name} - main image`}
                  className="w-full h-[500px] object-contain p-4"
                />
                {productDetails?.data?.discount && (
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                    {productDetails?.data?.discount}% OFF
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleShare}
                  className="absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productDetails?.data?.productImage?.map(
                  (image: IProductImage, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative min-w-[80px] h-20 border rounded-lg overflow-hidden ${
                        activeImageIndex === index ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <img
                        src={image.url ?? ""}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-12 w-full" />
            </>
          ) : (
            <>
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {productDetails?.data?.category?.name}
                  </Badge>
                  <Link
                    to={`/shop-products/${productDetails?.data?.shop?.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    by {productDetails?.data?.shop?.name}
                  </Link>
                </div>
                <h1 className="text-3xl font-bold">
                  {productDetails?.data?.name}
                </h1>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center">
                    {renderStars(productDetails?.data?.avgRating || 0)}
                    <span className="ml-1 text-sm text-muted-foreground">
                      ({productDetails?.data?.review?.length || 0} reviews)
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-muted-foreground">
                    {productDetails?.data?.inventoryCount} in stock
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-muted-foreground">{shortDescription}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  ৳{(discountedPrice * quantity).toLocaleString()}
                </span>
                {productDetails?.data?.discount && (
                  <span className="text-lg text-muted-foreground line-through">
                    ৳{(productDetails?.data?.price * quantity).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleIncreaseQuantity}
                    disabled={
                      quantity >= (productDetails?.data?.inventoryCount || 1)
                    }
                    className="h-10 w-10 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={addToCart}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white gap-2"
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Shipping & Returns */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Free shipping over ৳60</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">30-day return policy</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      {!isLoading && (
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
              >
                Reviews ({productDetails?.data?.review?.length || 0})
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p>{productDetails?.data?.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-8">
                {productDetails?.data?.review?.length < 1 ? (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                    <p className="text-muted-foreground">
                      Be the first to review this product
                    </p>
                  </div>
                ) : (
                  productDetails?.data?.review.map((review: IReview) => (
                    <div key={review.id} className="flex gap-4 border-b pb-6">
                      <div className="flex-shrink-0">
                        <img
                          src={review.user.image || "/placeholder.svg"}
                          alt={review.user.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{review.user.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-sm mb-3">{review.content}</p>

                        {review.replayReview?.length > 0 && (
                          <div className="bg-gray-50 p-4 rounded-lg mt-3">
                            <h5 className="text-sm font-medium mb-2">
                              Shop Response
                            </h5>
                            {review.replayReview.map((replay) => (
                              <div key={replay.id} className="text-sm">
                                {replay.content}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}

                {orderData?.data?.status === "COMPLETED" && (
                  <div className="mt-8 pt-4 border-t">
                    <h3 className="text-xl font-semibold mb-4">
                      Write a Review
                    </h3>
                    <CustomerReviewForm productId={id} />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="pt-6">
              <div className="prose max-w-none">
                <h3>Shipping Information</h3>
                <p>
                  We offer free standard shipping on all orders over ৳60. Orders
                  are typically processed within 1-2 business days.
                </p>

                <h3 className="mt-6">Return Policy</h3>
                <p>
                  We accept returns within 30 days of delivery. Items must be
                  unused and in their original packaging.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Related Products */}
      <div className="mt-16">
        <CategoryProduct
          id={id}
          categoryId={productDetails?.data?.categoryId}
        />
      </div>
    </div>
  );
}
