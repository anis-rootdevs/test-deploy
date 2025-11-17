import { uploadToCloudinary } from "@/config/cloudinary";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { bannerSchema } from "@/lib/validation-schema";
import Banner from "@/model/Banner";
import { NextRequest } from "next/server";
import z from "zod";

// Create a banner
export const POST = asyncFormDataHandler(
  bannerSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof bannerSchema>,
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
        folder: `${process.env.CLOUDINARY_FOLDER}/banner`,
      }
    );

    const bannerData = { ...data, image: public_id };
    await Banner.create(bannerData);

    return apiResponse(true, 200, "Banner has been created successfully!");
  },
  true
);

// Get all banners
export const GET = asyncHandler(async () => {
  const banners = await Banner.aggregate([
    {
      $sort: { position: 1 },
    },
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
    "Banners has been fetched successfully!",
    banners
  );
}, true);
