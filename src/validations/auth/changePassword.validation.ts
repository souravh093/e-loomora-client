import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "Old password is required" })
      .min(6, { message: "Old password must be at least 6 characters long" }),
    newPassword: z
      .string({ required_error: "Current password is required" })
      .min(6, {
        message: "Current password must be at least 6 characters long",
      }),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
