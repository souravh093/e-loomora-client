import { z } from "zod";
import { imageSchema } from "../auth/signup.validation";

export const createCategoryValidationSchema = z
  .object({
    name: z.string({ required_error: "Category name is required" }),
  })
  .merge(imageSchema);

export const updateCategoryValidationSchema = z
  .object({
    name: z.string({ required_error: "Category name is required" }).optional(),
  })
  .merge(imageSchema)
  .optional();

export type CreateCategoryFormValues = z.infer<
  typeof createCategoryValidationSchema
>;

export type UpdateCategoryFormValues = z.infer<
  typeof updateCategoryValidationSchema
>;
