import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { reservationShowcaseSchema } from "@/lib/validation-schema";
import Showcase from "@/model/Showcase";
import { NextRequest } from "next/server";
import z from "zod";

// Update Reservation Showcase
export const PUT = asyncFormDataHandler(
  reservationShowcaseSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof reservationShowcaseSchema>,
    formData: FormData
  ) => {
    const imageFields = ["lightImage", "darkImage"] as const;
    const uploadedImages: Record<string, string> = {};

    // Fetch existing showcase data
    const showcase = await Showcase.findOne({});
    const existingShowcase = showcase?.reservationShowcase;

    for (const field of imageFields) {
      const file = formData.get(field);

      if (file) {
        const { valid, error } = fileValidator(file as File, {
          required: false,
        });
        if (!valid) return apiResponse(false, 400, error!);

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
        acc[`reservationShowcase.${key}`] = value;
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
      "Reservation Showcase has been updated successfully!"
    );
  },
  true
);

export const GET = asyncHandler(async () => {
  const { reservationShowcase } = (await Showcase.findOne({})).toObject();

  const data = {
    ...reservationShowcase,
    lightImage: `${CLOUDINARY_SECURE_URL_BASE}/${reservationShowcase?.lightImage}`,
    darkImage: `${CLOUDINARY_SECURE_URL_BASE}/${reservationShowcase?.darkImage}`,
  };

  return apiResponse(
    true,
    200,
    "Reservation showcase has been fetched successfully!",
    data
  );
}, true);
