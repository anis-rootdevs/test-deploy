import { clsx, type ClassValue } from "clsx";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function apiResponse<T = undefined>(
  status: boolean,
  statusCode: number = 200,
  message: string,
  data?: T,
  pagination?: T
) {
  return NextResponse.json(
    {
      status,
      message,
      data,
      pagination,
    },
    { status: statusCode }
  );
}

export function generateSignature<T extends object>(
  payload: T,
  expiresIn: number
) {
  return jwt.sign(payload, process.env.NEXTAUTH_SECRET!, { expiresIn });
}

// Checks if a JWT token is expired.
export function isTokenExpired(exp?: number): boolean {
  if (!exp) return false;
  const now = Date.now() / 1000;
  return now >= exp;
}

// match extract route
export function extractRoutes(obj: Record<string, any>): string[] {
  const links: string[] = [];
  for (const value of Object.values(obj)) {
    if (typeof value === "string") {
      links.push(value);
    } else if (typeof value === "object" && value !== null) {
      links.push(...extractRoutes(value));
    }
  }
  return links;
}
