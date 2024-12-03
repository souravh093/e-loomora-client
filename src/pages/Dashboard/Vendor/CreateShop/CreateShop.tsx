/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { useCreateShopMutation } from "@/redux/api/features/shopApi";
import { useAppSelector } from "@/redux/hooks";
import { uploadImageToFirebase } from "@/utils/uploadFile";
import {
  ShopFromValues,
  shopValidationSchema,
} from "@/validations/shop/shop.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const CreateShop = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const id = currentUser ? currentUser.id : null;
  const navigate = useNavigate();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [shopPreviewImage, setShopPreviewImage] = useState<string | null>(null);

  const [createShop, { isLoading }] = useCreateShopMutation();

  const shopForm = useForm<ShopFromValues>({
    resolver: zodResolver(shopValidationSchema),
  });
  const onUserSubmit: SubmitHandler<ShopFromValues> = async (data) => {
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
      const response = await createShop({
        name: data.name,
        description: data.description,
        logoUrl: downloadUrl,
        ownerId: id,
      }).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        shopForm.reset();
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  const handleShopImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      shopForm.setValue("image", file);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Your Shop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={shopForm.handleSubmit(onUserSubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="shop-name">Shop Name</Label>
              <Input
                id="shop-name"
                type="text"
                {...shopForm.register("name")}
                className="mt-1"
              />
              {shopForm.formState.errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {shopForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="shop-description">Shop Description</Label>
              <Input
                id="shop-description"
                type="text"
                {...shopForm.register("description")}
                className="mt-1"
              />
              {shopForm.formState.errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {shopForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="shop-logo">Profile Image (Optional)</Label>
              <Input
                id="shop-logo"
                type="file"
                accept="image/*"
                onChange={handleShopImageChange}
                className="mt-1"
              />
              {shopForm.formState.errors.image && (
                <p className="text-sm text-red-500 mt-1">
                  {shopForm.formState.errors.image.message as string}
                </p>
              )}
              {shopPreviewImage && (
                <div className="mt-2">
                  <img
                    src={shopPreviewImage}
                    alt="Preview"
                    className="rounded-full object-cover w-32 h-32"
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isLoading || isImageUploading ? <Loader /> : "Create Shop"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateShop;
