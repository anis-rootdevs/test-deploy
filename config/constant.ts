export const ROLE = {
  ADMIN: "admin",
  USER: "user",
};

export const CLOUDINARY_SECURE_URL_BASE =
  process.env.CLOUDINARY_SECURE_URL_BASE || "";

export const CACHE_KEYS = {
  MENU: "menu",
} as const;

export const RESERVE_TABLE_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
} as const;
