import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { shopShowcaseSchema } from "@/lib/validation-schema";
import Showcase from "@/model/Showcase";
import { NextRequest } from "next/server";
import z from "zod";

// Update Shop Showcase
export const PUT = asyncFormDataHandler(
  shopShowcaseSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof shopShowcaseSchema>,
    formData: FormData
  ) => {
    const imageFields = ["imageOne", "imageTwo", "imageThree"] as const;
    const uploadedImages: Record<string, string> = {};

    // Fetch existing showcase data
    const showcase = await Showcase.findOne({});
    const existingShowcase = showcase?.shopShowcase;

    for (const field of imageFields) {
      const file = formData.get(field);

      if (file) {
        const { valid, error } = fileValidator(file as File, {
          required: false,
        });

        if (!valid) {
          return apiResponse(false, 400, error!);
        }

        // Delete existing image from Cloudinary if it exists
        if (existingShowcase?.[field]) {
          await deleteFromCloudinary(existingShowcase[field]);
        }

        // Upload new image to Cloudinary
        const { public_id } = await uploadToCloudinary(file as File, {
          folder: `${process.env.CLOUDINARY_FOLDER}/showcase`,
        });

        uploadedImages[field] = public_id;
      }
    }

    // Build $set object with only the fields being updated
    const updateFields = Object.entries({ ...data, ...uploadedImages }).reduce(
      (acc, [key, value]) => {
        acc[`shopShowcase.${key}`] = value;
        return acc;
      },
      {} as Record<string, any>
    );

    await Showcase.findOneAndUpdate(
      {},
      { $set: updateFields },
      { upsert: true }
    );

    return apiResponse(
      true,
      200,
      "Shop Showcase has been updated successfully!"
    );
  },
  true
);
