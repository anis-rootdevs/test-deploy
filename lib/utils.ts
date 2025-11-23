import { clsx, type ClassValue } from "clsx";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import z from "zod";

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

export type NestedRoutes =
  | string
  | { [key: string]: NestedRoutes | ((...args: any[]) => string) };

export function extractRoutes(obj: NestedRoutes): string[] {
  const links: string[] = [];

  for (const value of Object.values(obj as Record<string, any>)) {
    if (typeof value === "string") {
      links.push(value);
    } else if (typeof value === "function") {
      // skip functions because we cannot statically extract dynamic route
      continue;
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

export const toObjectId = (id?: string | null) =>
  id ? Types.ObjectId.createFromHexString(id) : undefined;

export const requiredStringField = (fieldName: string) =>
  z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return `${fieldName} is required!`;
        }
        return `${fieldName} must be string!`;
      },
    })
    .transform((val) => val.trim())
    .refine((str) => str.length > 0, {
      message: `${fieldName} must not be empty!`,
    });

export const requiredStringFieldLowerCase = (fieldName: string) =>
  z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return `${fieldName} is required!`;
        }
        return `${fieldName} must be string!`;
      },
    })
    .transform((val) => val.trim().toLowerCase())
    .refine((str) => str.length > 0, {
      message: `${fieldName} must not be empty!`,
    });

export const optionalStringField = (fieldName: string) =>
  z
    .string({ error: () => `${fieldName} must be string!` })
    .transform((val) => val.trim())
    .refine((str) => str.length > 0, {
      message: `${fieldName} must not be empty!`,
    })
    .optional();

export const optionalStringFieldLowerCase = (fieldName: string) =>
  z
    .string({ error: () => `${fieldName} must be string!` })
    .transform((val) => val.trim().toLowerCase())
    .refine((str) => str.length > 0, {
      message: `${fieldName} must not be empty!`,
    })
    .optional();

export const requiredEnumField = <T extends readonly [string, ...string[]]>(
  fieldName: string,
  values: T
) =>
  z.enum(values, {
    error: (issue) => {
      const input = issue.input;

      if (input === undefined) return `${fieldName} is required!`;

      if (typeof input !== "string") {
        return `${fieldName} must be a valid ${fieldName}!`;
      }

      return `${fieldName} must be one of: ${values.join(", ")}`;
    },
  });

export const requiredObjectIdField = (fieldName: string) =>
  z
    .string({
      error: (issue) => {
        const input = issue.input;

        if (input === undefined) return `${fieldName} is required!`;
        if (typeof input !== "string") return `${fieldName} must be a string!`;

        return `${fieldName} must be a valid ObjectId!`;
      },
    })
    .refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
      message: `${fieldName} must be a valid ObjectId!`,
    });

export const optionalEnumField = <T extends readonly [string, ...string[]]>(
  fieldName: string,
  values: T
) =>
  z
    .enum(values, {
      error: () => `${fieldName} must be one of: ${values.join(", ")}`,
    })
    .optional();

export const optionalObjectIdField = (fieldName: string) =>
  z
    .string({ error: () => `${fieldName} must be a string!` })
    .refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
      message: `${fieldName} must be a valid ObjectId!`,
    })
    .optional();

export const booleanField = (fieldName: string, defaultValue?: boolean) => {
  const baseSchema = z
    .boolean({
      error: (issue) => {
        if (issue.input === undefined) {
          return `${fieldName} is required!`;
        }
        return `${fieldName} must be a boolean!`;
      },
    })
    .optional();

  return defaultValue !== undefined
    ? baseSchema.default(defaultValue)
    : baseSchema;
};

export const requiredNumberField = (
  fieldName: string,
  enumValues?: number[]
) => {
  let schema = z.coerce.number({
    error: (issue) => {
      if (issue.input === undefined) {
        return `${fieldName} is required!`;
      }
      return `${fieldName} must be a number!`;
    },
  });

  if (enumValues && enumValues.length > 0) {
    schema = schema.refine((val) => enumValues.includes(val), {
      message: `${fieldName} must be one of: ${enumValues.join(", ")}`,
    });
  }

  return schema;
};

export const numberField = (fieldName: string, defaultValue?: number) => {
  const baseSchema = z.coerce
    .number({
      error: (issue) => {
        if (issue.input === undefined) {
          return `${fieldName} is required!`;
        }
        return `${fieldName} must be a number!`;
      },
    })
    .optional();

  return defaultValue !== undefined
    ? baseSchema.default(defaultValue)
    : baseSchema;
};
