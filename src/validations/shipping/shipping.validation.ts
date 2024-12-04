import { z } from "zod";

export const shippingFromValidation = z.object({
  address: z.string().min(1, { message: "Address is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  zip: z.string().min(1, { message: "Zip is required." }),
  phone: z.string().min(1, { message: "Phone is required." }),
});
