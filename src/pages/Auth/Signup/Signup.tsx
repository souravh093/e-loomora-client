/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  signupUserValidationSchema,
  signupVendorValidationSchema,
  UserSignupFormValues,
  VendorSignupFormValues,
} from "@/validations/auth/signup.validation";
import { Link, useNavigate } from "react-router";
import { uploadImageToFirebase } from "@/utils/uploadFile";
import {
  useSignUpUserMutation,
  useSignUpVendorMutation,
} from "@/redux/api/features/authApi";
import Loader from "@/components/shared/Loader";
import { toast } from "@/hooks/use-toast";
import signupImage from "@/assets/login.png";
import logo from "@/assets/logo.png";

export default function SignupForm() {
  const navigate = useNavigate();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"user" | "vendor">("user");
  const [userPreviewImage, setUserPreviewImage] = useState<string | null>(null);
  const [vendorPreviewImage, setVendorPreviewImage] = useState<string | null>(
    null
  );

  // Api call
  const [createUser, { isLoading: userSignupLoading }] =
    useSignUpUserMutation();
  const [createVendor, { isLoading: vendorSignupLoading }] =
    useSignUpVendorMutation();

  const userForm = useForm<UserSignupFormValues>({
    resolver: zodResolver(signupUserValidationSchema),
  });

  const vendorForm = useForm<VendorSignupFormValues>({
    resolver: zodResolver(signupVendorValidationSchema),
  });

  const onUserSubmit: SubmitHandler<UserSignupFormValues> = async (data) => {
    let downloadUrl: string | null | undefined = null;
    if (data.image) {
      downloadUrl = await uploadImageToFirebase(
        data.image,
        setIsImageUploading
      );
      if (downloadUrl) {
        console.log("Image uploaded successfully:", downloadUrl);
      } else {
        toast({
          variant: "destructive",
          title: "Image upload failed",
        });
      }
    }

    try {
      const response = await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        ...(downloadUrl && { image: downloadUrl }),
      }).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        userForm.reset();
        navigate("/login");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  const onVendorSubmit: SubmitHandler<VendorSignupFormValues> = async (
    data
  ) => {
    let downloadUrl: string | null | undefined = null;
    if (data.image) {
      downloadUrl = await uploadImageToFirebase(
        data.image,
        setIsImageUploading
      );
      if (downloadUrl) {
        console.log("Image uploaded successfully:", downloadUrl);
      } else {
        console.log("Image upload failed");
      }
    }

    try {
      const response = await createVendor({
        name: data.name,
        email: data.email,
        password: data.password,
        ...(downloadUrl && { image: downloadUrl }),
      }).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        userForm.reset();
        navigate("/login");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  const handleUserImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      userForm.setValue("image", file);
    }
  };

  const handleVendorImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVendorPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      vendorForm.setValue("image", file);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center min-h-screen">
        <div className="bg-yellow-500 h-full">
          <img src={signupImage} alt="signup" className="w-full" />
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
              Create Your Account
            </h1>
            <p className="text-center pt-4 text-gray-600">
              Please sign up to create a new account
            </p>
          </div>
          <div className="mt-10">
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
                  className="space-y-4 w-96 lg:w-[400px] mx-auto mt-10"
                >
                  <div>
                    <Label htmlFor="user-name">Name</Label>
                    <Input
                      id="user-name"
                      type="text"
                      {...userForm.register("name")}
                      className="mt-1"
                    />
                    {userForm.formState.errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {userForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>
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
                    <Label htmlFor="user-password">Password</Label>
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
                  <div>
                    <Label htmlFor="user-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="user-confirm-password"
                      type="password"
                      {...userForm.register("confirmPassword")}
                      className="mt-1"
                    />
                    {userForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {userForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="user-image">Profile Image (Optional)</Label>
                    <Input
                      id="user-image"
                      type="file"
                      accept="image/*"
                      onChange={handleUserImageChange}
                      className="mt-1"
                    />
                    {userForm.formState.errors.image && (
                      <p className="text-sm text-red-500 mt-1">
                        {userForm.formState.errors.image.message as string}
                      </p>
                    )}
                    {userPreviewImage && (
                      <div className="mt-2">
                        <img
                          src={userPreviewImage}
                          alt="Preview"
                          className="rounded-full object-cover w-32 h-32"
                        />
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full bg-yellow-500 py-6 text-lg">
                    {userSignupLoading || isImageUploading ? (
                      <Loader />
                    ) : (
                      "Sign up as User"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="vendor">
                <form
                  onSubmit={vendorForm.handleSubmit(onVendorSubmit)}
                  className="space-y-4 w-96 lg:w-[400px] mx-auto mt-10"
                >
                  <div>
                    <Label htmlFor="vendor-name">Vendor Name</Label>
                    <Input
                      id="vendor-name"
                      type="text"
                      {...vendorForm.register("name")}
                      className="mt-1"
                    />
                    {vendorForm.formState.errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {vendorForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>
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
                    <Label htmlFor="vendor-password">Password</Label>
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
                  <div>
                    <Label htmlFor="vendor-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="vendor-confirm-password"
                      type="password"
                      {...vendorForm.register("confirmPassword")}
                      className="mt-1"
                    />
                    {vendorForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {vendorForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="vendor-image">Vendor Image (Optional)</Label>
                    <Input
                      id="vendor-image"
                      type="file"
                      accept="image/*"
                      onChange={handleVendorImageChange}
                      className="mt-1"
                    />
                    {vendorForm.formState.errors.image && (
                      <p className="text-sm text-red-500 mt-1">
                        {vendorForm.formState.errors.image.message as string}
                      </p>
                    )}
                    {vendorPreviewImage && (
                      <div className="mt-2">
                        <img
                          src={vendorPreviewImage}
                          alt="Preview"
                          className="rounded-full object-cover w-32 h-32"
                        />
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full bg-yellow-500 py-6 text-lg">
                    {vendorSignupLoading || isImageUploading ? (
                      <Loader />
                    ) : (
                      "Sign up as Vendor"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          <div className="text-center mt-10">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}