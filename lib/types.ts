import z from "zod";
import { newsletterSchema } from "./validation-schema";

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
