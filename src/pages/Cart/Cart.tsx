/* eslint-disable @typescript-eslint/no-explicit-any */
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/api/features/authSlice";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export default function CartPage() {
  const router = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const cartProducts = useAppSelector((state) => state.cart.items);

  const subtotal = cartProducts.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const shippingCost = subtotal > 0 ? 60 : 0;
  const totalPrice = subtotal + shippingCost;

  const isDisabled = cartProducts.some((product) => {
    return product.stockQuantity < product.quantity;
  });

  const isOutOfStock = cartProducts.some((product) => {
    return product.stockQuantity === 0;
  });

  const handleCheckout = () => {
    if (user && user.status === "SUSPENDED") {
      toast({
        variant: "destructive",
        description: "Your account is suspended",
      });
      return;
    }

    router(token && user?.role === "USER" ? "/checkout" : "/login");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartProducts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>৳{shippingCost.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>৳{totalPrice.toLocaleString()}</span>
                </div>

                {isOutOfStock && (
                  <div className="text-destructive text-sm mt-2">
                    Some items are out of stock
                  </div>
                )}

                {isDisabled && !isOutOfStock && (
                  <div className="text-destructive text-sm mt-2">
                    Some items exceed available stock
                  </div>
                )}

                <Button
                  className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white"
                  size="lg"
                  disabled={isDisabled || isOutOfStock}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router("/all-products")}
                >
                  Continue Shopping
                </Button>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

function CartItem({ product }: { product: any }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch({ type: "cart/removeItem", payload: product.id });
    toast({
      description: "Item removed from cart",
    });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > product.stockQuantity) {
      toast({
        variant: "destructive",
        description: "Cannot exceed available stock",
      });
      return;
    }

    dispatch({
      type: "cart/updateQuantity",
      payload: { id: product.id, quantity: newQuantity },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
        <img
          src={product.image || "/placeholder.svg?height=128&width=128"}
          alt={product.name}
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-grow space-y-2">
        <div className="flex justify-between">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

        {product.stockQuantity === 0 ? (
          <span className="text-destructive text-sm">Out of stock</span>
        ) : product.stockQuantity < product.quantity ? (
          <span className="text-destructive text-sm">
            Only {product.stockQuantity} available
          </span>
        ) : null}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {product.color && <span>Color: {product.color}</span>}
          {product.size && <span>Size: {product.size}</span>}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleUpdateQuantity(product.quantity - 1)}
              disabled={product.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center">{product.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleUpdateQuantity(product.quantity + 1)}
              disabled={product.quantity >= product.stockQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="font-semibold">
            ৳{(product.price * product.quantity).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  const router = useNavigate();

  return (
    <div className="text-center py-16 space-y-6">
      <div className="flex justify-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Looks like you haven't added anything to your cart yet. Browse our
        products and find something you'll love!
      </p>
      <Button
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white"
        size="lg"
        onClick={() => router("/")}
      >
        Start Shopping
      </Button>
    </div>
  );
}
