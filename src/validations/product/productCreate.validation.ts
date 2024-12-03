import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string(),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  stock: z.number().int().min(0, {
    message: "Stock must be a non-negative integer.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  images: z
    .custom<FileList>(
      (val) => val instanceof FileList,
      "Please upload at least one image."
    )
    .refine((files) => files.length > 0, "Please upload at least one image.")
    .refine(
      (files) => files.length <= 5,
      "You can upload a maximum of 5 images."
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
      "Each image must be no larger than 5MB."
    ),
});
