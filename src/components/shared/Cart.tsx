import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/redux/hooks";
import CartCard from "./CartCard";
import { ShoppingCart } from "lucide-react";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/api/features/authSlice";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const cartProducts = useAppSelector((state) => state.cart.items);
  const totalPrice = cartProducts.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const isDisabled = cartProducts.some((product) => {
    return product.stockQuantity < product.quantity;
  });

  const isOutOfStock = cartProducts.some((product) => {
    return product.stockQuantity === 0;
  });

  const handleCheckout = () => {

    if(user && user.status === "SUSPENDED") {
      toast({
        variant: "destructive",
        description: "Your account is suspended",
      });
      return;
    }

    navigate(token && user?.role === "USER" ? "/checkout" : "/login");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <button className="text-gray-200">
            <ShoppingCart className="w-10 h-10" />
          </button>
          <span className="absolute bottom-0 -right-2 z-30 bg-yellow-500 px-2 rounded-full">
            {cartProducts.length}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="shadow-lg text-gray-400 w-full mx-auto">
        <SheetTitle className="text-gray-700 border-b-2 ">
          Cart Items
        </SheetTitle>
        <div className="mt-5 flex flex-col gap-4 overflow-y-auto max-h-screen-3/4">
          {cartProducts.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </div>

        {cartProducts.length > 0 ? (
          <div className="border-t py-4 flex flex-col mt-10">
            <div className="flex items-center justify-end">
              <div className="flex justify-between items-center gap-2">
                <p className="font-medium text-2xl">Total: </p>
                <p className="font-medium text-2xl">৳{totalPrice}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                disabled={isDisabled || isOutOfStock}
                onClick={handleCheckout}
                className={`flex-1 bg-yellow-500 hover:bg-yellow-600 cursor-pointer ${
                  isDisabled || (isOutOfStock && "cursor-not-allowed")
                }`}
              >
                Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-gray-400">No items in the cart</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
