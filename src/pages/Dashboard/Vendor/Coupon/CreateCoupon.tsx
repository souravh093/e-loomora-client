/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  Form,
} from "@/components/ui/form";
import {
  createCouponFormValues,
  createCouponValidationSchema,
} from "@/validations/coupon/coupon.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCouponMutation } from "@/redux/api/features/coupoonApi";
import { toast } from "@/hooks/use-toast";

const generateCouponCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const CreateCoupon = () => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const form = useForm<createCouponFormValues>({
    resolver: zodResolver(createCouponValidationSchema),
    defaultValues: {
      code: "",
      discount: 0,
    },
  });

  const handleGenerateCode = () => {
    const generatedCode = generateCouponCode();
    form.setValue("code", generatedCode);
  };

  const couponSubmit = async (data: createCouponFormValues) => {
    try {
      const response = await createCoupon(data).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        form.reset();
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(couponSubmit)}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder="Coupon Code"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={handleGenerateCode}
                      className="ml-2 bg-yellow-500 text-black hover:bg-yellow-600"
                    >
                      Generate Code
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount in (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value || "0"))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full md:w-auto my-2 bg-yellow-500 text-black hover:bg-yellow-600"
          >
            {isLoading ? "Loading..." : "Create Coupon"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCoupon;
