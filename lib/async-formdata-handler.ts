import dbConnect from "@/config/database";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authenticate } from "./authenticate";
import { apiResponse } from "./utils";

export type FormDataApiHandler<T> = (
  req: NextRequest,
  data: T,
  formData: FormData
) => Promise<NextResponse>;

// Main asyncFormDataHandler
export function asyncFormDataHandler<T>(
  schema: z.ZodSchema<T>,
  handler: FormDataApiHandler<T>,
  checkAuth: boolean = false
): (req: NextRequest) => Promise<NextResponse> {
  return async (req: NextRequest) => {
    try {
      await dbConnect();

      if (checkAuth) {
        const { error, data } = await authenticate(req);
        if (error) return error;
        req.user = data;
      }

      // Parse FormData
      const formData = await req.formData();

      // Extract text fields for validation
      const textData: Record<string, unknown> = {};

      formData.forEach((value, key) => {
        if (!(value instanceof File)) {
          textData[key] = value;
        }
      });

      // Validate text data with Zod schema
      const validatedData = schema.parse(textData);

      return await handler(req, validatedData, formData);
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
