import { apiResponse } from "@/lib/api-response";
import { asyncHandler } from "@/lib/async-handler";
import { validateRequest } from "@/lib/validate-request";
import { loginSchema } from "@/lib/validation-schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const { data, error } = await validateRequest(req, loginSchema);

  if (error) {
    return NextResponse.json(
      {
        status: error.status,
        error: error.message,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }

  console.log({ data });

  return apiResponse(true, 200, "Login successfully!");
});
