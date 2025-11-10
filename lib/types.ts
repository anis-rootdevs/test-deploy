import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { newsletterSchema } from "./validation-schema";
import { FieldValues, Path } from "react-hook-form";
import { ReactNode } from "react";

export type ApiHandler<T> = (
  req: NextRequest,
  data: T
) => Promise<NextResponse>;

export type SimpleHandler = (req: NextRequest) => Promise<NextResponse>;
export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export interface NewsletterSubscribeProps {
  onSubscribe?: (email: string) => void;
  className?: string;
}

// cafe location
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

// form password field

export interface FormPasswordInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  id?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  className?: string;
  prefix?: ReactNode;
}

// form input field

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
}
