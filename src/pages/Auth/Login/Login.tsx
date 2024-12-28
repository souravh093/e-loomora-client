/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import loginImage from "@/assets/login.png";
import logo from "@/assets/logo.png";

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

  // Default credentials
  const defaultCredentials = {
    user: { email: "user@gmail.com", password: "user1234" },
    vendor: { email: "vendor@gmail.com", password: "vendor1234" },
    admin: { email: "souravh093@gmail.com", password: "admin@123" },
  };

  const handleAutoFill = (role: "user" | "vendor" | "admin") => {
    const credentials = defaultCredentials[role];
    userForm.setValue("email", credentials.email);
    userForm.setValue("password", credentials.password);
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center min-h-screen">
        <div className="bg-yellow-500 h-full">
          <img src={loginImage} alt="login" className="w-full" />
        </div>
        <div className="pr-10">
          <div>
            <div className="flex items-center gap-2 justify-center pb-6">
              <Link to="/">
                <img src={logo} alt="logo" className="h-16 w-16" />
              </Link>
              <h2 className="text-3xl font-black">LOOMORA</h2>
            </div>
            <h1 className="text-xl md:text-3xl xl:text-6xl font-bold text-center">
              Welcome Back
            </h1>
            <p className="text-center pt-4 text-gray-600">
              Please login to you account
            </p>
          </div>
          <div>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                type="button"
                onClick={() => handleAutoFill("user")}
                className="bg-yellow-400 text-white"
              >
                Autofill User
              </Button>
              <Button
                type="button"
                onClick={() => handleAutoFill("vendor")}
                className="bg-yellow-500 text-white"
              >
                Autofill Vendor
              </Button>
              <Button
                type="button"
                onClick={() => handleAutoFill("admin")}
                className="bg-yellow-600 text-white"
              >
                Autofill Admin
              </Button>
            </div>
            <form
              onSubmit={userForm.handleSubmit(onUserSubmit)}
              className="space-y-4 w-96 lg:w-[400px] mx-auto mt-10"
            >
              <div>
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  {...userForm.register("email")}
                  className="mt-1"
                  placeholder="Email address"
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
                    <Link to="/forget-password" className="text-sm">
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
              <Button
                type="submit"
                className="w-full bg-yellow-500 py-6 text-lg"
              >
                {isLoading ? <Loader /> : "Login"}
              </Button>
            </form>

            <div className="text-center mt-10">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-yellow-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
