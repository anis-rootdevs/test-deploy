import mongoose, { Document } from "mongoose";
import { ReactNode } from "react";
import { FieldValues, Path } from "react-hook-form";
import z from "zod";
import { newsletterSchema } from "./validation-schema";

export type AuthUser = {
  _id: string;
};

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
export type ReverseFilterType = "all" | "pending" | "confirmed" | "cancelled";
export interface Outlets {
  _id: string;
  name: string;
  location?: string;
  dialCode?: string;
  phone?: string;
  image?: string;
  googleMapLink?: string;
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
  googleMapLink?: string;
  locationId?: string;
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

export interface ReverseTable {
  _id: string;
  outlet:
    | {
        _id: string;
        name: string;
      }
    | string;
  reason: string;
  name: string;
  email: string;
  dialCode: string;
  phone: string;
  reservedAt: string;
  numOfPeople: number;
  message: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}
export interface CreateReverseTableInput {
  outlet: string; // always string
  reason: string;
  name: string;
  email: string;
  dialCode: string;
  phone: string;
  reservedAt: string;
  numOfPeople: number;
  message: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface ChefCardProps {
  image: string;
  name: string;
  tagline: string;
  id: number;
  // _id: string;
}
export type Chef = {
  _id: string;
  tagline: string;
  image: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  capturedBy: string;
  status?: boolean;
  dialCode?: string;
  phone?: string;
  name?: string;
  gender?: string;
};

export interface IShopShowcase extends Document {
  heading: string;
  shortDesc: string;
  coffeeLovers: number;
  tagline: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
}

export interface IStoryShowcase extends Document {
  heading: string;
  shortDesc: string;
  story: string;
  tagline: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  values: {
    title: string;
    shortDesc: string;
    icon: string;
  }[];
}

export interface IOfferShowcase extends Document {
  heading: string;
  tagline: string;
  deadline: Date;
  image: string;
  products: mongoose.Types.ObjectId[];
}
export interface IReservationShowcase extends Document {
  cta: string;
  heading: string;
  tagline: string;
  darkImage: string;
  lightImage: string;
}

export interface IShowcase extends Document {
  shopShowcase: IShopShowcase;
  storyShowcase: IStoryShowcase;
  offerShowcase: IOfferShowcase;
  reservationShowcase: IReservationShowcase;
}

export interface IGeneral extends Document {
  companyName: string;
  companyDialCode: string;
  companyPhone: string;
  companyAddress: string;
  logo: string;
  favicon: string;
  supportEmail: string;
  ownerName: string;
  ownerEmail: string;
}

export interface IBusinessHours {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  openTime: number; // Minutes from midnight (0-1439)
  closeTime: number; // Minutes from midnight (0-1439)
  isClosed: boolean;
}

export interface IPageBanner {
  menu: string;
  location: string;
  gallery: string;
  reserveTable: string;
}

export interface ICloudinary {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
  secureUrlBase: string;
}

export interface ISettings extends Document {
  general: IGeneral;
  pageBanner: IPageBanner;
  cloudinary: ICloudinary;
  businessHours: IBusinessHours[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExistingValue {
  _id?: mongoose.Types.ObjectId;
  title: string;
  shortDesc: string;
  icon: string;
}

export type ShopShowcase = {
  _id: string;
  tagline: string;
  heading: string;
  shortDesc: string;
  coffeeLovers: string;
  imageOne?: string;
  imageTwo?: string;
  imageThree?: string;
};

export type BusinessHour = {
  day: string;
  open: string;
  close: string;
};
export type ReservationShowcase = {
  _id: string;
  tagline: string;
  heading: string;
  cta: string;
  darkImage?: string;
  lightImage?: string;
  businessHour?: string[];
};
