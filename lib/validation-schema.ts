import { z } from "zod";
import { requiredNumberField, requiredStringField } from "./utils";

export const newsletterSchema = z.object({
  email: z
    .email("Valid email is required!")
    .min(5, "Email must be at least 5 characters!")
    .trim(),
});

export const adminLoginSchema = z.object({
  email: z.email("Valid email is required!").min(1, "Required!").trim(),
  password: z.string("Required!").min(1, "Required!"),
});

export const adminProfileSchema = z.object({
  name: z.string().trim().nullable(),
});

export const adminFrontendProfileSchema = z.object({
  name: z.string("name must be string!").min(1, "Required!").trim(),
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
  tagline: requiredStringField("tagline"),
  heading: requiredStringField("heading"),
  shortDesc: requiredStringField("shortDesc"),
  theme: requiredNumberField("theme", [1, 2, 3, 4]),
});

export const outletSchema = z.object({
  name: z.string("name must be string!").min(1, "Required!").trim(),
  location: z.string("location must be string!").min(1, "Required!").trim(),
  dialCode: z.string("dialCode must be string!").min(1, "Required!").trim(),
  phone: z.string("phone must be string!").min(1, "Required!").trim(),
  status: z.boolean("status must be boolean!").optional(),
});

export const statusSchema = z.object({
  status: z.boolean("Value must be boolean!"),
});

export const categorySchema = z.object({
  name: z.string("Required!").min(1, "Required!").trim(),
  slug: z.string("Required!").min(1, "Required!").toLowerCase().trim(),
  status: z.boolean("Status must be boolean!").optional(),
});

export const sortSchema = z.object({
  sortedIds: z.array(z.string()).min(1, "Required!"),
});

export const productSchema = z.object({
  name: z
    .string("name must be string!")
    .min(1, "Required!")
    .max(200, "Name must be less than 200 characters!")
    .trim(),
  shortDesc: z
    .string("shortDesc must be string!")
    .min(1, "Short description cannot be empty!")
    .max(500, "Short description must be less than 500 characters")
    .trim(),
  price: z
    .string("price must be number-string!")
    .min(1, "Required!")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "price must be a valid number!",
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "price must be greater than 0!" })
    .refine((val) => val <= 999999.99, { message: "price is too high!" }),
  category: z
    .string("category must be string!")
    .regex(/^[0-9a-fA-F]{24}$/, "Category must be a valid MongoDB ObjectId!")
    .min(1, "Required!"),
});

export const dataTableSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const bannerTableSchema = z.object({
  id: z.string(),
  tagline: z.string(),
  shortDesc: z.string(),
  heading: z.string(),
  position: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DataTable = z.infer<typeof dataTableSchema>;
export type BannerDataTable = z.infer<typeof bannerTableSchema>;
