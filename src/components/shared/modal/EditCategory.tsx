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
import { updateCategoryValidationSchema } from "@/validations/category/createCategory.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Loader from "../Loader";
import { useState } from "react";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/features/categoryApi";
import { uploadImageToFirebase } from "@/utils/uploadFile";
import { toast } from "@/hooks/use-toast";
import { FilePenLine } from "lucide-react";

const EditCategory = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [categoryPreviewImage, setCategoryPreviewImage] = useState<
    string | null
  >(null);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const { data: categoryData } = useGetCategoryByIdQuery(id);

  const categoryForm = useForm({
    resolver: zodResolver(updateCategoryValidationSchema),
    defaultValues: {
      name: categoryData?.data.name,
      image: categoryData?.data.logo,
    },
  });

  const onUserSubmit: SubmitHandler<FieldValues> = async (data) => {
    let downloadUrl: string | null | undefined = null;
    if (data && data.image) {
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
      const updateDataInfo = {
        id: id,
        data: {
          name: data.name,
          logo: downloadUrl || categoryData?.data.logo,
        },
      };

      const response = await updateCategory(updateDataInfo).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        categoryForm.reset();
        setIsOpen(false);
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
          <Button variant="outline">
            <FilePenLine />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
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
                defaultValue={categoryData?.data.name}
              />
              {categoryForm.formState.errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {categoryForm.formState.errors.name.message as string}
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
              {(categoryPreviewImage || categoryData?.data.logo) && (
                <div className="mt-2">
                  <img
                    src={categoryPreviewImage || categoryData?.data.logo}
                    alt="Preview"
                    className="rounded-full object-cover w-32 h-32"
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isLoading || isImageUploading ? <Loader /> : "Update Category"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCategory;
