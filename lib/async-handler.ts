import dbConnect from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ApiHandler, SimpleHandler } from "./types";
import { apiResponse } from "./utils";

// Overload 1: With validation
export function asyncHandler<T>(
  schema: z.ZodSchema<T>,
  handler: ApiHandler<T>
): (req: NextRequest) => Promise<NextResponse>;

// Overload 2: Without validation
export function asyncHandler(
  handler: SimpleHandler
): (req: NextRequest) => Promise<NextResponse>;

// Implementation
export function asyncHandler<T>(
  schemaOrHandler: z.ZodSchema<T> | SimpleHandler,
  handler?: ApiHandler<T>
): (req: NextRequest) => Promise<NextResponse> {
  // Case 1: With validation (schema + handler)
  if (handler && schemaOrHandler instanceof z.ZodType) {
    return async (req: NextRequest) => {
      try {
        await dbConnect();

        const body = await req.json();
        const data = schemaOrHandler.parse(body);

        return await handler(req, data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const details = error.issues.reduce((acc, issue) => {
            const field = issue.path.join(".") || "general";
            acc[field] = issue.message;
            return acc;
          }, {} as Record<string, string>);

          return apiResponse(false, 400, "Request validation failed!", details);
        }

        console.error(error);
        return apiResponse(false, 500, "Something went wrong!");
      }
    };
  }

  // Case 2: Without validation (just handler)
  const simpleHandler = schemaOrHandler as SimpleHandler;
  return async (req: NextRequest) => {
    try {
      await dbConnect();
      return await simpleHandler(req);
    } catch (err) {
      console.error(err);
      return apiResponse(false, 500, "Something went wrong!");
    }
  };
}
