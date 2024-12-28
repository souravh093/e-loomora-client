import { IProduct } from "@/types/product.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem } from "@/redux/api/features/cartSlice";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { ShoppingCart, Star, Store } from "lucide-react";
import { Link } from "react-router";
import { CartAlertModal } from "./modal/CartAlertModal";
import { cn } from "@/lib/utils";

const ProductMarqueeCard = ({ product }: { product: IProduct }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const userStatus = currentUser ? currentUser.status : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.items);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const cart = {
    id: product.id,
    name: product.name,
    shopId: product.shopId,
    price: Number(discountedPrice.toFixed(2)),
    image: product?.productImage?.[0]?.url ?? "",
    stockQuantity: product.inventoryCount,
  };

  const addToCart = () => {
    if (currentUser && userStatus === "SUSPENDED") {
      toast({
        variant: "destructive",
        description: "Your account is suspended",
      });
      return;
    } else if (currentUser?.role === "VENDOR") {
      toast({
        variant: "destructive",
        description: "Vendor can't add product to cart",
      });
      return;
    } else if (currentUser?.role === "ADMIN") {
      toast({
        variant: "destructive",
        description: "Admin can't add product to cart",
      });
      return;
    }

    for (const item of cartProducts) {
      if (item.shopId !== product.shopId) {
        setIsModalOpen(true);
        return;
      }
    }

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
    <>
      {isModalOpen && (
        <CartAlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={cart}
        />
      )}
      <figure
        className={cn(
          "relative flex w-full max-w-md h-64 rounded-lg border p-4 gap-4",
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
      >
        <div className="w-1/3 relative">
          <img
            src={product?.productImage?.[0]?.url ?? ""}
            alt={product.name}
            className="object-cover h-full w-full rounded-md"
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
        <div className="flex flex-col w-2/3 justify-between">
          <div>
            <Link to={`/shop-products/${product.shopId}`} className="flex items-center gap-1">
              <Store className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium dark:text-white">
                {product.shop.name}
              </span>
            </Link>
            <figcaption className="mt-2 text-lg font-semibold dark:text-white">
              <Link to={`/product-details/${product.id}`} className="hover:underline">
                {product.name}
              </Link>
            </figcaption>
          </div>
          <div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xl font-bold text-primary">
                ৳{discountedPrice.toLocaleString()}
              </p>
              {product.discount && (
                <p className="text-sm text-gray-500 line-through">
                  ৳{product.price.toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-sm">
                Stock: {product.inventoryCount}
              </Badge>
              <div className="flex items-center">
                {renderStars(product.avgRating)}
                <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                  ({product.review.length})
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={addToCart}
            className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            <ShoppingCart className="inline-block w-4 h-4 mr-2" /> Add to Cart
          </button>
        </div>
      </figure>
    </>
  );
};

export default ProductMarqueeCard;
