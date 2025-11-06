import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function validateRequest<T>(
  req: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ data?: T; error?: NextResponse }> {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    return { data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: error.issues.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
          { status: 400 }
        ),
      };
    }
    return {
      error: NextResponse.json(
        { success: false, error: "Invalid JSON" },
        { status: 400 }
      ),
    };
  }
}
