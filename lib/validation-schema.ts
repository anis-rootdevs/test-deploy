import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export interface NewsletterSubscribeProps {
  onSubscribe?: (email: string) => void;
  className?: string;
}
