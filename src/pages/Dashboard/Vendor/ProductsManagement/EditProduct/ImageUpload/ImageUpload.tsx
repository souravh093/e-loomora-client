/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useCreateProductImageMutation } from "@/redux/api/features/productApi";
import { uploadImageToFirebase } from "@/utils/uploadFile";
import { imageSchema } from "@/validations/auth/signup.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ImageUpload = ({ id }: { id: string | undefined }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [uploadProductImage, { isLoading }] = useCreateProductImageMutation();
  const form = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
  });

  const onSubmit = async (data: z.infer<typeof imageSchema>) => {
    console.log(data);
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

    const productData = {
      productId: id,
      url: downloadUrl,
    };

    try {
      const response = await uploadProductImage(productData).unwrap();

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full md:w-auto">
            {isLoading || isImageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
