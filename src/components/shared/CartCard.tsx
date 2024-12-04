
import { toast } from "@/hooks/use-toast";
import {
  CartItem,
  removeItem,
  updateQuantity,
} from "@/redux/api/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CircleX } from "lucide-react";
import { Button } from "../ui/button";

const CartCard = ({ product }: { product: CartItem }) => {
  const dispatch = useAppDispatch();
  const { id, image, name, price, quantity } = product;
  const handleQuantityIncrease = () => {
    console.log("first", quantity);
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleQuantityDecrease = () => {
    if (quantity === 1) {
      toast({
        variant: "destructive",
        title: "Quantity can't be less than 1",
      });
      return;
    }
    dispatch(updateQuantity({ id, quantity: quantity - 1 }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className="border-b border-gray-600 p-1 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={image}
          className="w-8 h-8 rounded-md bg-gray-500 object-cover"
          alt="cart product image"
        />
        <h1 className="text-sm">{name}</h1>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={handleQuantityDecrease}
          className="text-xl font-bold hover:text-gray-900 hover:shadow-lg"
        >
          -
        </button>
        <div className="border border-red-500  px-2">{quantity}</div>
        <button
          onClick={handleQuantityIncrease}
          className="text-xl font-bold hover:text-gray-900  hover:shadow-lg"
        >
          +
        </button>
      </div>

      <h1>৳{price}</h1>

      <Button 
        size={"icon"}
        variant={"outline"}
        onClick={handleRemoveItem}
        className="bg-red-500 text-white"
      >
        <CircleX />
      </Button>
    </div>
  );
};

export default CartCard;
