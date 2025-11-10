import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { newsletterSchema } from "./validation-schema";

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
