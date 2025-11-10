import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { loginSchema } from "@/lib/validation-schema";
import { NextRequest } from "next/server";
import z from "zod";

export const POST = asyncHandler(
  loginSchema,
  async (req: NextRequest, data: z.infer<typeof loginSchema>) => {
    console.log({ data });

    return apiResponse(true, 200, "Login successfully!");
  }
);
