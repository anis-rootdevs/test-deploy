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
export const adminFrontendProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().nullable(),
});

export const passwordChangeSchema = z
  .object({
    oldPassword: z.string("Required").min(1, "Required!"),
    newPassword: z
      .string("Required")
      .min(6, "Password must be at least 6 characters long!"),
    confirmPassword: z.string("Required").min(1, "Required!"),
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const bannerSchema = z.object({
  tagline: z.string("Required").min(1, "Required!"),
  heading: z.string("Required").min(1, "Required!"),
  shortDesc: z.string("Required").min(1, "Required!"),
});
