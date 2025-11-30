import { RESERVE_TABLE_STATUS } from "@/config/constant";
import { z } from "zod";
import {
  booleanField,
  optionalStringField,
  requiredEnumField,
  requiredNumberField,
  requiredObjectIdField,
  requiredStringField,
  requiredStringFieldLowerCase,
} from "./utils";

const { PENDING, CONFIRMED, CANCELLED } = RESERVE_TABLE_STATUS;

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

export const chefSchema = z.object({
  name: requiredStringField("name"),
  tagline: requiredStringField("tagline"),
  gender: requiredStringFieldLowerCase("gender"),
  dialCode: requiredStringField("dialCode"),
  phone: requiredStringField("phone"),
  status: booleanField("status", true),
});

export const gallerySchema = z.object({
  tagline: requiredStringField("tagline"),
  capturedBy: requiredStringField("capturedBy"),
  status: booleanField("status", true),
  featured: booleanField("featured", false),
});

export const shopShowcaseSchema = z.object({
  heading: requiredStringField("heading"),
  shortDesc: requiredStringField("shortDesc"),
  coffeeLovers: requiredNumberField("coffeeLovers"),
  tagline: requiredStringField("tagline"),
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

export const reserveTableSchema = z.object({
  outlet: requiredObjectIdField("outlet"),
  reason: requiredStringField("reason"),
  name: requiredStringField("name"),
  email: requiredStringField("email"),
  dialCode: requiredStringField("dialCode"),
  phone: requiredStringField("phone"),
  reservedAt: requiredStringField("reservedAt"),
  numOfPeople: requiredNumberField("numOfPeople"),
  message: optionalStringField("message"),
});

export const reserveStatusSchema = z.object({
  status: requiredEnumField("status", [PENDING, CONFIRMED, CANCELLED]),
});

export const sortSchema = z.object({
  sortedIds: z.array(z.string()).min(1, "Required!"),
});

export const productSchema = z.object({
  name: requiredStringField("name"),
  shortDesc: requiredStringField("shortDesc"),
  price: z
    .string("price must be number-string!")
    .min(1, "Required!")
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "price must be a valid number!",
    })
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "price must be greater than 0!" })
    .refine((val) => val <= 999999.99, { message: "price is too high!" }),
  category: requiredObjectIdField("category"),
  status: booleanField("status", true),
  mostLoved: booleanField("mostLoved", false),
  featured: booleanField("featured", false),
  new: booleanField("new", false),
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
