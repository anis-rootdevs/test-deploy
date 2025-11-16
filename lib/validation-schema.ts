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

export const bannerUpdateSchema = z.object({
  tagline: z.string("Value must be string!"),
  heading: z.string("Value must be string!"),
  shortDesc: z.string("Value must be string!"),
});

export const bannerSortSchema = z.object({
  sortedIds: z.array(z.string()).min(1, "Required!"),
});

export const dataTableSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});
// data table scheme
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
