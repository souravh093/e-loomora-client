import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  loginVendorValidationSchema,
  UserLoginFormValues,
  VendorLoginFormValues,
} from "@/validations/auth/login.validation";
import { Link } from "react-router";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState<"user" | "vendor">("user");

  const userForm = useForm<UserLoginFormValues>({
    resolver: zodResolver(loginUserValidationSchema),
  });

  const vendorForm = useForm<VendorLoginFormValues>({
    resolver: zodResolver(loginVendorValidationSchema),
  });

  const onUserSubmit: SubmitHandler<UserLoginFormValues> = (data) => {
    console.log("User login data:", data);
    // Handle user login logic here
  };

  const onVendorSubmit: SubmitHandler<VendorLoginFormValues> = (data) => {
    console.log("Vendor login data:", data);
    // Handle vendor login logic here
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
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "user" | "vendor")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
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
                      <Link
                        to="/forget-password"
                        className="text-red-500 text-sm"
                      >
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
                  Log in as User
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="vendor">
              <form
                onSubmit={vendorForm.handleSubmit(onVendorSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="vendor-email">Vendor Email</Label>
                  <Input
                    id="vendor-email"
                    type="email"
                    {...vendorForm.register("email")}
                    className="mt-1"
                  />
                  {vendorForm.formState.errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {vendorForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="vendor-password">Password</Label>
                    <span>
                      <Link
                        to="/forget-password"
                        className="text-red-500 text-sm"
                      >
                        Forgot password?
                      </Link>
                    </span>
                  </div>
                  <Input
                    id="vendor-password"
                    type="password"
                    {...vendorForm.register("password")}
                    className="mt-1"
                  />
                  {vendorForm.formState.errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {vendorForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Log in as Vendor
                </Button>
              </form>
            </TabsContent>
          </Tabs>
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
