/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookCopy } from "lucide-react";
import { IProductImage } from "@/types/product.type";
import { useState } from "react";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { uploadImagesToFirebase } from "@/utils/uploadFile";
import { toast } from "@/hooks/use-toast";
import { useCreateProductMutation } from "@/redux/api/features/productApi";
import Loader from "./shared/Loader";

interface IDuplicateProps {
  product: {
    name: string;
    description: string;
    price: number;
    inventoryCount: number;
    discount: number | undefined;
    shopId: string;
    productImage: IProductImage[] | undefined;
    category: string;
  };
}

const Duplicate = ({ product }: IDuplicateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { data: categoriesData, isLoading } = useGetCategoriesQuery(undefined);
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();

  const form = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      stock: product.inventoryCount,
      discount: product.discount || 0,
      description: product.description,
      category: product.category,
      images: [],
    },
  });

  const [imagePreview, setImagePreview] = useState<string[]>(
    product.productImage?.map((image) => image.url) || []
  );

  const [productImages, setProductImages] = useState<string[]>(
    product.productImage?.map((image) => image.url) || []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...urls]);
  };

  const handleRemoveImage = (index: number, src?: string) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setProductImages((prev) => prev.filter((image) => image !== src));
  };

  const onSubmit = async (data: any) => {
    let downloadUrls: string[] = [];
    if (data.images && data.images.length > 0) {
      downloadUrls = await uploadImagesToFirebase(
        data.images,
        setIsImageUploading
      );
      if (downloadUrls.length > 0) {
        console.log("Images uploaded successfully:", downloadUrls);
      } else {
        toast({
          variant: "destructive",
          title: "Image upload failed",
        });
      }
    }

    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      inventoryCount: data.stock,
      ...(data.discount && { discount: data.discount }),
      categoryId: data.category,
      shopId: product.shopId,
      productImage: [...productImages, ...downloadUrls],
    };

    console.log(productData);

    try {
      const response = await createProduct(productData).unwrap();

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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <BookCopy />
            Duplicate
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
          </DialogHeader>

          <div className="container mx-auto py-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
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
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
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
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount in (%) (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value || "0"))
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

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Product Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            handleImageChange(e);
                            onChange(e.target.files);
                          }}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                    {imagePreview.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2"
                          onClick={() => handleRemoveImage(index, src)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <Button type="submit" className="w-full md:w-auto">
                  {isImageUploading || createLoading ? (
                    <Loader />
                  ) : (
                    "Duplicate Product"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Duplicate;
