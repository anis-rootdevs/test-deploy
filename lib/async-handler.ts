import dbConnect from "@/config/database";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authenticate } from "./authenticate";
import { ApiHandler, AuthUser, SimpleHandler } from "./types";
import { apiResponse } from "./utils";

// Overload 1: With validation
export function asyncHandler<T>(
  schema: z.ZodSchema<T>,
  handler: ApiHandler<T>,
  checkAuth?: boolean
): (req: NextRequest) => Promise<NextResponse>;

// Overload 2: Without validation
export function asyncHandler(
  handler: SimpleHandler,
  checkAuth?: boolean
): (req: NextRequest) => Promise<NextResponse>;

// Implementation
export function asyncHandler<T>(
  schemaOrHandler: z.ZodSchema<T> | SimpleHandler,
  handlerOrCheckAuth?: ApiHandler<T> | boolean,
  checkAuth?: boolean
): (req: NextRequest) => Promise<NextResponse> {
  // Determine which overload is being used
  const isValidationCase =
    handlerOrCheckAuth !== undefined && typeof handlerOrCheckAuth !== "boolean";

  // Case 1: With validation (schema + handler + optional checkAuth)
  if (isValidationCase && schemaOrHandler instanceof z.ZodType) {
    const schema = schemaOrHandler;
    const handler = handlerOrCheckAuth as ApiHandler<T>;
    const shouldCheckAuth = checkAuth ?? false;

    return async (req: NextRequest) => {
      try {
        await dbConnect();

        // Authenticate if required
        let authUser: AuthUser | undefined;
        if (shouldCheckAuth) {
          const { error, data } = await authenticate(req);
          if (error) return error;
          authUser = data;
        }

        const body = await req.json();
        const data = schema.parse(body);

        return await handler(req, data, authUser);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const details = error.issues.reduce((acc, issue) => {
            const field = issue.path.join(".") || "general";
            acc[field] = issue.message;
            return acc;
          }, {} as Record<string, string>);

          return apiResponse(false, 400, "Request validation failed!", details);
        }

        if (error instanceof JsonWebTokenError) {
          return apiResponse(false, 401, "Unauthorized Token!");
        }

        console.error(error);
        return apiResponse(false, 500, "Something went wrong!");
      }
    };
  }

  // Case 2: Without validation (just handler + optional checkAuth)
  const simpleHandler = schemaOrHandler as SimpleHandler;
  const shouldCheckAuth =
    typeof handlerOrCheckAuth === "boolean" ? handlerOrCheckAuth : false;

  return async (req: NextRequest) => {
    try {
      await dbConnect();

      // Authenticate if required
      let authUser: AuthUser | undefined;
      if (shouldCheckAuth) {
        const { error, data } = await authenticate(req);
        if (error) return error;
        authUser = data;
      }

      return await simpleHandler(req, authUser);
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        return apiResponse(false, 401, "Unauthorized Token!");
      }

      console.error(err);
      return apiResponse(false, 500, "Something went wrong!");
    }
  };
}
