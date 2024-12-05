import { IProduct } from "@/types/product.type";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { ShoppingCart, Store } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "@/hooks/use-toast";
import { addItem } from "@/redux/api/features/cartSlice";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.items);
  const addToCart = () => {
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
      price: product.price,
      image: product?.productImage?.[0]?.url ?? "",
      stockQuantity: product.inventoryCount,
    };

    dispatch(addItem(cart));

    toast({
      variant: "default",
      description: "Product added to cart",
    });
  };
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/product-details/${product.id}`}>
        <div className="relative  overflow-hidden">
          <img
            src={product?.productImage?.[0]?.url ?? ""}
            alt={product.name}
            className="object-cover h-44 w-full transition-transform hover:scale-105"
          />
          <Badge className="absolute right-2 top-2 bg-black/60 hover:bg-black/70">
            {product.category.name}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/product-details/${product.id}`}>
          <h3 className="text-lg font-semibold line-clamp-2 hover:underline">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="mt-2 text-xl font-bold text-primary">
            ৳{product.price.toLocaleString()}
          </p>
          <p className="mt-2 bg-yellow-100 px-2 rounded-md text-sm flex items-center gap-1">
            <Store className="w-4 h-4" />
            {product.shop.name}
          </p>
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
