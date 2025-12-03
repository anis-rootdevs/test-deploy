import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { settingsGeneralSchema } from "@/lib/validation-schema";
import Settings from "@/model/Settings";
import { NextRequest } from "next/server";
import z from "zod";

export const PUT = asyncFormDataHandler(
  settingsGeneralSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof settingsGeneralSchema>,
    formData: FormData
  ) => {
    const imageFields = ["logo", "favicon"] as const;
    const uploadedImages: Record<string, string> = {};

    // Fetch existing showcase data
    const { general } = (await Settings.findOne({})) || {};

    for (const field of imageFields) {
      const file = formData.get(field);

      if (file) {
        const { valid, error } = fileValidator(file as File, {
          required: false,
        });
        if (!valid) return apiResponse(false, 400, error!);

        // Delete existing image from Cloudinary if it exists
        if (general?.[field]) {
          await deleteFromCloudinary(general[field]);
        }

        // Upload new image to Cloudinary
        const { public_id } = await uploadToCloudinary(file as File, {
          folder: `${process.env.CLOUDINARY_FOLDER}/settings`,
        });

        uploadedImages[field] = public_id;
      }
    }

    // Build $set object with only the fields being updated
    const updateFields = Object.entries({ ...data, ...uploadedImages }).reduce(
      (acc, [key, value]) => {
        acc[`general.${key}`] = value;
        return acc;
      },
      {} as Record<string, any>
    );

    await Settings.findOneAndUpdate(
      {},
      { $set: updateFields },
      { upsert: true }
    );

    return apiResponse(
      true,
      200,
      "General settings has been updated successfully!"
    );
  },
  true
);

export const GET = asyncHandler(async () => {
  const { general } = (await Settings.findOne({})) || {};

  if (!general) {
    return apiResponse(false, 404, "General settings not found!");
  }

  const data = {
    ...general.toObject(),
    logo: general?.logo
      ? `${CLOUDINARY_SECURE_URL_BASE}/${general?.logo}`
      : null,
    favicon: general?.favicon
      ? `${CLOUDINARY_SECURE_URL_BASE}/${general?.favicon}`
      : null,
  };

  return apiResponse(
    true,
    200,
    "General settings has been fetched successfully!",
    data
  );
}, true);
