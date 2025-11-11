import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .email("Valid email is required!")
    .min(5, "Email must be at least 5 characters!"),
});

export const adminLoginSchema = z.object({
  email: z.email("Valid email is required!").min(1, "Required!"),
  password: z.string("Required!").min(1, "Required!"),
});

export const adminProfileSchema = z.object({
  name: z.string().nullable(),
});

export const passwordChangeSchema = z.object({
  email: z.email("Valid email is required!").min(1, "Required!"),
  password: z.string("Required!").min(1, "Required!"),
});
