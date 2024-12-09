import { IProduct } from "@/types/product.type";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { ShoppingCart, Store, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "@/hooks/use-toast";
import { addItem } from "@/redux/api/features/cartSlice";
import { selectCurrentUser } from "@/redux/api/features/authSlice";

const ProductCard = ({ product }: { product: IProduct }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const userStatus = currentUser ? currentUser.status : null;
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.items);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const addToCart = () => {
    if (currentUser && userStatus === "SUSPENDED") {
      toast({
        variant: "destructive",
        description: "Your account is suspended",
      });
      return;
    }

    for (const item of cartProducts) {
      if (item.shopId !== product.shopId) {
        toast({
          variant: "destructive",
          description: "Replace the cart with the new product",
        });
        return;
      }
    }

    const cart = {
      id: product.id,
      name: product.name,
      shopId: product.shopId,
      price: Number(discountedPrice.toFixed(2)),
      image: product?.productImage?.[0]?.url ?? "",
      stockQuantity: product.inventoryCount,
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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/product-details/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product?.productImage?.[0]?.url ?? ""}
            alt={product.name}
            className="object-cover h-48 w-full transition-transform hover:scale-105"
          />
          <Badge className="absolute right-2 top-2 bg-black/60 hover:bg-black/70">
            {product.category.name}
          </Badge>
          {product?.discount && (
            <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">
              {product.discount}% OFF
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/product-details/${product.id}`}>
          <h3 className="text-lg font-semibold line-clamp-2 hover:underline">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {renderStars(product.avgRating)}
            <span className="ml-1 text-sm text-gray-600">
              ({product.review.length})
            </span>
          </div>
          <Link
            to={`/shop-products/${product.shopId}`}
            className="bg-yellow-100 px-2 rounded-md text-sm flex items-center gap-1"
          >
            <Store className="w-4 h-4" />
            {product.shop.name}
          </Link>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-xl font-bold text-primary">
              ৳{discountedPrice.toLocaleString()}
            </p>
            {product.discount && (
              <p className="text-sm text-gray-500 line-through">
                ৳{product.price.toLocaleString()}
              </p>
            )}
          </div>
          <Badge variant="outline" className="text-sm">
            Stock: {product.inventoryCount}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          onClick={addToCart}
          className="w-full bg-yellow-500 text-black hover:bg-yellow-600 hover:text-black"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
