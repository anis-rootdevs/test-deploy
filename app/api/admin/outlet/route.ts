import { uploadToCloudinary } from "@/config/cloudinary";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { outletSchema } from "@/lib/validation-schema";
import Outlet from "@/model/Outlet";
import { NextRequest } from "next/server";
import z from "zod";

// Create a outlet
export const POST = asyncFormDataHandler(
  outletSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof outletSchema>,
    formData: FormData
  ) => {
    const { valid, error } = fileValidator(formData.get("image") as File, {
      required: true,
    });
    if (!valid) return apiResponse(false, 400, error!);

    // Upload to cloudinary
    const { public_id } = await uploadToCloudinary(
      formData.get("image") as File,
      {
        folder: `${process.env.CLOUDINARY_FOLDER}/outlet`,
      }
    );

    const outletData = { ...data, image: public_id };
    await Outlet.create(outletData);

    return apiResponse(true, 200, "Outlet has been created successfully!");
  },
  true
);

// Get all outlets
export const GET = asyncHandler(async () => {
  const outlets = await Outlet.aggregate([
    {
      $addFields: {
        image: {
          $cond: {
            if: { $ne: ["$image", null] }, // Check if image exists
            then: {
              $concat: [
                process.env.CLOUDINARY_SECURE_URL_BASE || "",
                "/",
                "$image",
              ],
            },
            else: null, // or a default image URL
          },
        },
      },
    },
  ]);

  return apiResponse(
    true,
    200,
    "Outlets has been fetched successfully!",
    outlets
  );
}, true);
