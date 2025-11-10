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
