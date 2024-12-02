/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForgetPasswordMutation } from "@/redux/api/features/authApi";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [isEmailIconOpen, setEmailIconOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handelEmailIconOpen = () => {
    setEmailIconOpen(true);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await forgetPassword(data.email).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        reset();
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
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Card className="w-full max-w-sm border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl mx-auto">Forgot Password</CardTitle>
          <CardDescription className="text-gray-700">
            Enter your email address below and we will send you instructions to
            reset your password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 text-white">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder={`Enter your email `}
                  required
                  onFocus={handelEmailIconOpen}
                  className="border-2 border-gray-500 px-7 text-black"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
                <div
                  className={`absolute top-2 left-2 ${
                    !isEmailIconOpen ? "absolute" : "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail text-gray-700"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-3 justify-start w-full">
            <Button className=" bg-[#2768FF] col-span-2 hover:bg-gray-300 hover:text-black transition duration-300">
              {isLoading ? <Loader /> : "Send Reset Instructions"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default ForgetPassword;
