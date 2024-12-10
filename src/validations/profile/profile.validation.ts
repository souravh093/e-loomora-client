import { z } from "zod";
import { imageSchema } from "../auth/signup.validation";

export const profileValidation = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
  })
  .merge(imageSchema);

export type ProfileFormValues = z.infer<typeof profileValidation>;
