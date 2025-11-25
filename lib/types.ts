import { NextRequest, NextResponse } from "next/server";
import { ReactNode } from "react";
import { FieldValues, Path } from "react-hook-form";
import z from "zod";
import { newsletterSchema } from "./validation-schema";

export type AuthUser = {
  _id: string;
};

export type ApiHandler<T> = (
  req: NextRequest,
  data: T
) => Promise<NextResponse>;

export type SimpleHandler = (req: NextRequest) => Promise<NextResponse>;

export type DecodedToken = {
  email: string;
  role: "admin" | "user";
};
export interface Category {
  _id: string;
  name: string;
  slug: string;
  count?: number;
  status?: boolean;
  position?: number;
}
export interface Products {
  _id: string;
  name: string;
  shortDesc?: string;
  price?: number;
  category?: string;
  image?: string;
  status?: boolean;
  mostLoved?: boolean;
  featured?: boolean;
}

export type FilterType = "all" | "mostLoved" | "featured";
export interface Outlets {
  _id: string;
  name: string;
  location?: string;
  dialCode?: string;
  phone?: string;
  image?: string;
  status?: boolean;
}

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export interface NewsletterSubscribeProps {
  onSubscribe?: (email: string) => void;
  className?: string;
}

interface OpeningHours {
  days: string;
  hours: string;
}

export interface CafeInfoCardProps {
  title: string;
  address: string;
  phone: string;
  openingHours: OpeningHours[];
  buttonText?: string;
  onReserveClick?: () => void;
  className?: string;
}

export interface OurValueItem {
  title: string;
  description: string;
  image: string;
}

export interface OurValueCardProps {
  item: OurValueItem;
}

export type NestedRoutes = {
  [key: string]: string | NestedRoutes;
};

export interface FormPasswordInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  id?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  className?: string;
  prefix?: ReactNode;
}

export interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  className?: string;
  prefix?: ReactNode;
  postfix?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// change password

//banner types
export type Banner = {
  _id: string;
  tagline: string;
  heading: string;
  shortDesc: string;
  image: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  status?: boolean;
};

export interface BannerFormData {
  tagline: string;
  heading: string;
  shortDesc: string;
  image?: File | string;
}

export interface HeroProps {
  tagline?: string;
  heading?: string;
  shortDesc?: string;
  image?: string;
  theme?: number;
  _id?: string;
}

export interface MostLovedItems {
  _id: string;
  name: string;
  shortDesc: string;
  price: number;
  image: string;
  category: string;
}
export type Galleries = {
  _id: string;
  tagline: string;
  image: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  capturedBy: string;
  status?: boolean;
  featured?: boolean;
};
