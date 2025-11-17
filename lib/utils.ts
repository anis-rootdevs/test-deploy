import { clsx, type ClassValue } from "clsx";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import { NestedRoutes } from "./types";

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

export function isTokenExpired(exp?: number): boolean {
  if (!exp) return false;
  const now = Date.now() / 1000;
  return now >= exp;
}

export function extractRoutes(obj: NestedRoutes): string[] {
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

export const makePaginate = <T>(
  docs: T[],
  page: number,
  limit: number,
  skip: number,
  total: number
) => {
  const hasNext = total > skip + Number(limit);
  const hasPrev = Number(page) > 1;

  return {
    docs,
    page: +page,
    limit: +limit,
    totalPage: Math.ceil(total / Number(limit)),
    totalDocs: total,
    hasNext,
    hasPrev,
  };
};
