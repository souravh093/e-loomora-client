/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateCategoryFormValues,
  createCategoryValidationSchema,
} from "@/validations/category/createCategory.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "../Loader";
import { useState } from "react";
import { useCreateCategoryMutation } from "@/redux/api/features/categoryApi";
import { uploadImageToFirebase } from "@/utils/uploadFile";
import { toast } from "@/hooks/use-toast";

const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [categoryPreviewImage, setCategoryPreviewImage] = useState<
    string | null
  >(null);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const categoryForm = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategoryValidationSchema),
  });

  const onUserSubmit: SubmitHandler<CreateCategoryFormValues> = async (
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
        toast({
          variant: "destructive",
          title: "Image upload failed",
        });
      }
    }

    try {
      const response = await createCategory({
        name: data.name,
        ...(downloadUrl && { logo: downloadUrl }),
      }).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        categoryForm.reset();
        setIsOpen(false);
      }
    } catch (error: any) {
      console.log(error);
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
        setCategoryPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      categoryForm.setValue("image", file);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Create Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={categoryForm.handleSubmit(onUserSubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                {...categoryForm.register("name")}
                className="mt-1"
              />
              {categoryForm.formState.errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {categoryForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="logo">Logo</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleUserImageChange}
                className="mt-1"
              />
              {categoryForm.formState.errors.image && (
                <p className="text-sm text-red-500 mt-1">
                  {categoryForm.formState.errors.image.message as string}
                </p>
              )}
              {categoryPreviewImage && (
                <div className="mt-2">
                  <img
                    src={categoryPreviewImage}
                    alt="Preview"
                    className="rounded-full object-cover w-32 h-32"
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isLoading || isImageUploading ? <Loader /> : "Create Category"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
