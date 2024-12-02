import { z } from "zod";

export const loginUserValidationSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});


export type UserLoginFormValues = z.infer<typeof loginUserValidationSchema>