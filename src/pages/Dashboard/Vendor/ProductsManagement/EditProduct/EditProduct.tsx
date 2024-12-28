/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { editProductFormSchema } from "@/validations/product/productCreate.validation";
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import {
  useDeleteProductImageMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/api/features/productApi";
import { useParams } from "react-router";
import { ImageUpload } from "./ImageUpload/ImageUpload";
import { CircleX } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const { data: productData } = useGetProductByIdQuery(id);
  const [deleteImage] = useDeleteProductImageMutation();

  const { data: categoriesData, isLoading: productLoading } =
    useGetCategoriesQuery(undefined);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editProductFormSchema>) => {
    const productData = {
      name: values.name,
      description: values.description,
      price: values.price,
      inventoryCount: values.stock,
      categoryId: values.category,
    };

    try {
      const response = await updateProduct({ id, data: productData }).unwrap();

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

  useEffect(() => {
    if (productData?.data) {
      form.reset({
        name: productData.data.name,
        price: productData.data.price,
        stock: productData.data.inventoryCount,
        category: productData.data.categoryId,
        description: productData.data.description,
      });
    }
  }, [productData, form]);

  const handleDeleteProductImage = async (id: string) => {
    try {
      const response = await deleteImage(id).unwrap();
      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });
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
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {productData?.data?.productImage?.map(
            (image: { url: string; id: string }) => (
              <div key={image.id} className="relative">
                <img
                  key={image.id}
                  src={image.url}
                  alt={"product-image"}
                  className="w-full h-44 rounded-lg border border-green-400 object-cover"
                />
                <span className="absolute right-3 top-2">
                  <Button
                    onClick={() => handleDeleteProductImage(image.id)}
                    size={"icon"}
                    variant="destructive"
                  >
                    <CircleX />
                  </Button>
                </span>
              </div>
            )
          )}
        </div>

        <div className="col-span-1">
          <ImageUpload id={id} />
        </div>
      </div>

      <SelectSeparator className="my-8" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={productData?.data?.name}
                      placeholder="Enter product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoriesData?.data?.map(
                        (category: { id: string; name: string }) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-32"
                    placeholder="Enter product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-auto">
            {productLoading ? "Update Product..." : "Update Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
