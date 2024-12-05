import { shippingFromValidation } from "@/validations/shipping/shipping.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";
import CartCard from "@/components/shared/CartCard";
import { useNavigate } from "react-router";

const Checkout = () => {

  const navigate = useNavigate();
  const cartProducts = useAppSelector((state) => state.cart.items);

  const totalPrice = cartProducts.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const form = useForm<z.infer<typeof shippingFromValidation>>({
    resolver: zodResolver(shippingFromValidation),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      phone: "",
    },
  });

  const onSubmit = (data: z.infer<typeof shippingFromValidation>) => {
    console.log(data);
    navigate("/payment", {state: {shippingData: data}});
  };

  return (
    <Container className="grid gird-cols-1 lg:grid-cols-2 py-10 gap-5">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold">Shipping Address</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter zip" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto">
                Continue to Payment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold">Order Summary</h1>
        </CardHeader>
        <CardContent>
          <div className="col-span-1 px-5 py-5 rounded-lg">
            <h1 className="text-4xl font-bold">Your order</h1>
            <div className="mt-5 flex flex-col gap-4">
              {cartProducts.map((product) => (
                <CartCard key={product.id} product={product} />
              ))}
            </div>

            {/* Coupon code */}
            <div className="flex items-center justify-between mt-5">
              <Input
                type="text"
                placeholder="Enter coupon code"
                className="w-2/3"
              />
              <Button className="w-1/3">Apply</Button>
            </div>

            {cartProducts.length > 0 ? (
              <div className="border-t py-4 flex flex-col mt-10">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="font-medium md:text-2xl">Total: </p>
                    <p className="font-medium md:text-2xl">৳{totalPrice}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-10">
                <p className="text-gray-400">No items in the cart</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Checkout;
