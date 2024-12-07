import * as z from "zod"

export const reviewSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Review must be at least 10 characters long" })
    .max(500, { message: "Review must not exceed 500 characters" }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1 star" })
    .max(5, { message: "Rating cannot exceed 5 stars" })
})

export type ReviewFormValues = z.infer<typeof reviewSchema>