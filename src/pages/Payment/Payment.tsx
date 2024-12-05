/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { CreditCard, ShoppingBag } from "lucide-react";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { useCreateOrderMutation } from "@/redux/api/features/orderApi";
import { toast } from "@/hooks/use-toast";
import { resetCart } from "@/redux/api/features/cartSlice";

const Payment = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const id = user ? user.id : null;
  const location = useLocation();
  const { shippingData } = location.state || {};
  const cartProducts = useAppSelector((state) => state.cart.items);

  const totalPrice = cartProducts.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handlePayment = async () => {
    const orderData = {
      userId: id,
      shopId: cartProducts[0].shopId,
      totalAmount: totalPrice,
      orderItem: cartProducts.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: {
        ...shippingData,
        userId: id,
      },
    };

    try {
      const response = await createOrder(orderData).unwrap();
      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });
        dispatch(resetCart());
        window.location.href = response.data.paymentResponse.payment_url;
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-white shadow-md">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold flex items-center">
            <ShoppingBag className="mr-2 h-6 w-6" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartProducts.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ৳{item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 space-y-2">
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>৳{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-6">
          <Button
            className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-semibold py-2 px-4 rounded"
            onClick={handlePayment}
            disabled={isLoading}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {isLoading ? "Processing..." : `Pay ৳${totalPrice.toFixed(2)}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payment;
