/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  loginUserValidationSchema,
  UserLoginFormValues,
} from "@/validations/auth/login.validation";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "@/redux/api/features/authApi";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/api/features/authSlice";
import Loader from "@/components/shared/Loader";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const userForm = useForm<UserLoginFormValues>({
    resolver: zodResolver(loginUserValidationSchema),
  });

  const onUserSubmit: SubmitHandler<UserLoginFormValues> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();

      const user = verifyToken(response.data.accessToken) as TUser;

      dispatch(
        setUser({
          user,
          token: response.data.accessToken,
        })
      );

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        navigate("/dashboard");
        userForm.reset();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Choose your account type to log in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={userForm.handleSubmit(onUserSubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                {...userForm.register("email")}
                className="mt-1"
              />
              {userForm.formState.errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {userForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="user-password">Password</Label>
                <span>
                  <Link to="/forget-password" className="text-red-500 text-sm">
                    Forgot password?
                  </Link>
                </span>
              </div>
              <Input
                id="user-password"
                type="password"
                {...userForm.register("password")}
                className="mt-1"
              />
              {userForm.formState.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {userForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? <Loader /> : "Log in as User"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
