import { NextRequest } from "next/server";
import { z } from "zod";

type ValidationError = {
  message: string;
  details?: Record<string, string>;
  status: boolean;
  statusCode: number;
};

export async function validateRequest<T>(
  req: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ data?: T; error?: ValidationError }> {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    return { data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert array to object format
      const details = error.issues.reduce((acc, issue) => {
        const field = issue.path.join(".") || "general";
        acc[field] = issue.message;
        return acc;
      }, {} as Record<string, string>);

      return {
        error: {
          status: false,
          message: "Validation failed!",
          details,
          statusCode: 400,
        },
      };
    }
    return {
      error: {
        status: false,
        message: "Invalid JSON!",
        statusCode: 400,
      },
    };
  }
}
