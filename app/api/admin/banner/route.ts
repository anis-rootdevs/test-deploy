import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { apiResponse } from "@/lib/utils";
import { bannerSchema } from "@/lib/validation-schema";
import { NextRequest } from "next/server";
import z from "zod";

export const POST = asyncFormDataHandler(
  bannerSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof bannerSchema>,
    formData: FormData
  ) => {
    const { tagline, heading, shortDesc } = data;

    console.log({ tagline, heading, shortDesc, formData });

    return apiResponse(true, 200, "Banner has been created successfully!");
  },
  true
);
