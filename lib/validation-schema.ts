import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters"),
});

export const loginSchema = z.object({
  email: z
    .string("Required!")
    .email("Valid email is required!")
    .min(1, "Required!"),
  password: z.string("Required!").min(1, "Required!"),
});
