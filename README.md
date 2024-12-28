# Loomora

### Live URL
```js
https://bright-bublanina-7d46a7.netlify.app/
```

# Introduction

Loomra is a multi vendor e-commerce website there customer easy way to but multiple type product with cool UX. Loomra website have anybody view product and add to cart and then checkout the product and sell also. Loomra have tree dashboard panel to mange the website. 

# Project Description

Loomra is very robots web application there customer buy his selected product. There is Home page there user search product and there show feature product, flash products and prioritize product as well. Loomra is have cart system user easyly add to cart and but the product using secure ammarypay payment method. Loomra have three dashboard panel. Like Customer, Vendor and Admin there Customer see summary of the activity and see this orders status. Vendor have add product, mange product, coupon manage and more. Admin there add category and see all activity.

Key features of PAWSAGE include:

- **User Roles**: Differentiated access for ADMIN, VENDOR, and CUSTOMER roles.
- **Authentication and Authorization**: Secure login and access control.
- **Secure Payment** User buy product secure system.
- **Coupon System** User use Coupon to buy the product.
- **Personalized Product** User view follow shop product.
- **Search, Filter, Sorting** User can do that.
- **Follow Shop** User can follow the shop.
- **Comparison** User can comparison three product.
- **Recent View Product** User can view Recent View Product.
- **Cart system** User can add product in the cart.
- **Infinite Scrolling**: Load more content as you scroll.
- **Dashboard Role Based**: Different dashboards for different user roles.
- **Mobile Responsive**: Optimized for mobile devices.
- **Review Product**: Users can review on product.

# Features
- User Roles
- Authentication and Authorization
- Secure Payment
- Mobile Responsive
- Coupon System
- Infinite Scrolling
- Dashboard Role based
- Payment System
- Filter Options
- Cart System
- Personalize Product
- Review product
- Follow Shop 

# Technology Stack

- react.js
- Redux
- RTK Query
- Typescript
- Lucid Icons
- Shadcn
- TailwindCSS
- Firebase
- ZOD
- React Hook Form
- Moment.js
- react-infinite-scroll-component
- Redux Persist
- React Router

## Installation Guideline

First clone the project then must you have node.js 18+ version. Then open the code editor and. Install node modules and run the project. One thing you must have the backend integrations.

# Prerequisite

- Node.js (18+ version)
- Code Editor

# Installation Steps

1. First Clone the project main branch

```js
https://github.com/souravh093/e-loomora-client
```

2. Open you terminal and change directory to the project directory
3. Install all package are added in the package.json file

```js
npm install
```

4. Then open the project in your code editor
5. Create .env.local and past below url
``js
NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
NEXT_PUBLIC_BASE_URL=http://localhost:5173/
``

7. Run the project your terminal

```js
npm run dev
```

8. Deploy then first command

```
npm run build
```

# Configuration

N/A

## Usage

* User Roles: Differentiated access for ADMIN, VENDOR, and CUSTOMER roles.
* Authentication and Authorization: Secure login and access control.
* Secure Payment: Users can buy products securely.
* Coupon System: Users can use coupons to buy products.
* Personalized Product: Users can view products from followed shops.
* Search, Filter, Sorting: Users can search, filter, and sort products.
* Follow Shop: Users can follow shops.
* Comparison: Users can compare up to three products.
* Recent View Product: Users can view recently viewed products.
* Cart System: Users can add products to the cart.
* Infinite Scrolling: Load more content as you scroll.
* Dashboard Role Based: Different dashboards for different user roles.
* Mobile Responsive: Optimized for mobile devices.
* Review Product: Users can review products.

### Thank You



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
