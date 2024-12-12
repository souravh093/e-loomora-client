import { z } from "zod";
import { imageSchema } from "../auth/signup.validation";

export const shopValidationSchema = z
  .object({
    name: z.string({ required_error: "Shop Name is required" }),
    description: z.string({ required_error: "Shop Description is required" }),
  })
  .merge(imageSchema);

export const shopUpdateValidationSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .merge(imageSchema);

export type ShopFromValues = z.infer<typeof shopValidationSchema>;
export type ShopUpdateFormValues = z.infer<typeof shopUpdateValidationSchema>;
