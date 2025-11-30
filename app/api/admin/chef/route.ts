import { uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { chefSchema } from "@/lib/validation-schema";
import Chef from "@/model/Chef";
import { NextRequest } from "next/server";
import z from "zod";

// Create a chef
export const POST = asyncFormDataHandler(
  chefSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof chefSchema>,
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
        folder: `${process.env.CLOUDINARY_FOLDER}/chef`,
      }
    );

    const chefData = { ...data, image: public_id };
    await Chef.create(chefData);

    return apiResponse(true, 200, "Chef has been created successfully!");
  },
  true
);

// Get all chefs
export const GET = asyncHandler(async () => {
  const chefs = await Chef.aggregate([
    {
      $sort: { position: 1 },
    },
    {
      $addFields: {
        image: {
          $cond: {
            if: { $ne: ["$image", null] }, // Check if image exists
            then: {
              $concat: [CLOUDINARY_SECURE_URL_BASE, "/", "$image"],
            },
            else: null, // or a default image URL
          },
        },
      },
    },
  ]);

  return apiResponse(true, 200, "Chefs have been fetched successfully!", chefs);
}, true);
