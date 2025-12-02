import { RESERVE_TABLE_STATUS } from "@/config/constant";
import { z } from "zod";
import {
  booleanField,
  optionalObjectIdField,
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

export const settingsGeneralSchema = z.object({
  companyName: requiredStringField("companyName"),
  companyDialCode: requiredStringField("companyDialCode"),
  companyPhone: requiredStringField("companyPhone"),
  companyAddress: requiredStringField("companyAddress"),
  supportEmail: requiredStringField("supportEmail"),
  ownerName: requiredStringField("ownerName"),
  ownerEmail: requiredStringField("ownerEmail"),
  logo: optionalStringField("logo"),
  favicon: optionalStringField("favicon"),
});

export const businessHourSchema = z.object({
  businessHour: z.array(
    z.object({
      dayOfWeek: z
        .number("Day of week must be a number!")
        .int("Day of week must be an integer")
        .min(0, "Day of week must be between 0 and 6")
        .max(6, "Day of week must be between 0 and 6"),
      openTime: z
        .number("Open time must be a number!")
        .int("Open time must be an integer")
        .min(0, "Open time must be between 0 and 1439")
        .max(1439, "Open time must be between 0 and 1439"),
      closeTime: z
        .number("Close time must be a number!")
        .int("Close time must be an integer")
        .min(0, "Close time must be between 0 and 1439")
        .max(1439, "Close time must be between 0 and 1439"),
      isClosed: booleanField("isClosed", false),
    })
  ),
});

export const offerShowcaseSchema = z.object({
  heading: requiredStringField("heading"),
  tagline: requiredStringField("tagline"),
  deadline: z.coerce.date("deadline must be a valid date!"),
  products: z
    .array(requiredObjectIdField("products"))
    .min(1, "At least one product is required!"),
});

export const storyShowcaseSchema = z.object({
  heading: requiredStringField("heading"),
  shortDesc: requiredStringField("shortDesc"),
  story: requiredStringField("story"),
  tagline: requiredStringField("tagline"),
  values: z
    .array(
      z.object({
        _id: optionalObjectIdField("_id"), // If exists = UPDATE, if not = CREATE
        title: requiredStringField("title"),
        shortDesc: requiredStringField("shortDesc"),
        icon: optionalStringField("icon"),
        _delete: booleanField("_delete", false), // Flag for deletion
      })
    )
    .optional(),
});

export const outletSchema = z.object({
  name: z.string("name must be string!").min(1, "Required!").trim(),
  location: z.string("location must be string!").min(1, "Required!").trim(),
  googleMapLink: z
    .string("googleMapLink must be string!")
    .min(1, "Required!")
    .trim(),
  dialCode: z.string("dialCode must be string!").min(1, "Required!").trim(),
  phone: z.string("phone must be string!").min(1, "Required!").trim(),
  status: z.coerce.boolean("status must be boolean!").optional(),
});

export const statusSchema = z.object({
  status: z.coerce.boolean("Value must be boolean!"),
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
