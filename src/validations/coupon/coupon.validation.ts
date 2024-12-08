import { z } from "zod";

export const createCouponValidationSchema = z.object({
  code: z.string().min(3, { message: "Code must be at least 3 characters" }),
  discount: z.number().min(1, { message: "Discount must be at least 1" }),
});

export type createCouponFormValues = z.infer<
  typeof createCouponValidationSchema
>;
