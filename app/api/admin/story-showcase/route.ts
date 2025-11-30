import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { storyShowcaseSchema } from "@/lib/validation-schema";
import Showcase from "@/model/Showcase";
import { NextRequest } from "next/server";
import z from "zod";

// Update Shop Showcase
export const PUT = asyncFormDataHandler(
  storyShowcaseSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof storyShowcaseSchema>,
    formData: FormData
  ) => {
    const imageFields = ["imageOne", "imageTwo", "imageThree"] as const;
    const uploadedImages: Record<string, string> = {};

    // Fetch existing showcase data
    const showcase = await Showcase.findOne({});
    const existingShowcase = showcase?.storyShowcase;

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

    // Handle values array with potential icon uploads
    const values = data.values || [];
    const updatedValues = [];

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const iconFile = formData.get(`values[${i}].icon`);
      let iconPublicId = values[i].icon;
      if (iconFile) {
        const { valid, error } = fileValidator(iconFile as File, {
          required: false,
        });

        if (!valid) {
          return apiResponse(false, 400, error!);
        }

        // Delete existing icon from Cloudinary if it exists
        if (existingShowcase?.values?.[i]?.icon) {
          await deleteFromCloudinary(existingShowcase.values[i].icon);
        }

        // Upload new icon to Cloudinary
        const { public_id } = await uploadToCloudinary(iconFile as File, {
          folder: `${process.env.CLOUDINARY_FOLDER}/showcase`,
        });

        iconPublicId = public_id;
      }

      updatedValues.push({ ...value, icon: iconPublicId });
    }
    data.values = updatedValues;

    // Build $set object with only the fields being updated
    const updateFields = Object.entries({ ...data, ...uploadedImages }).reduce(
      (acc, [key, value]) => {
        acc[`storyShowcase.${key}`] = value;
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
      "Story Showcase has been updated successfully!"
    );
  },
  true
);

export const GET = asyncHandler(async () => {
  const { storyShowcase } = (await Showcase.findOne({})).toObject();

  const data = {
    ...storyShowcase,
    imageOne: `${CLOUDINARY_SECURE_URL_BASE}/${storyShowcase?.imageOne}`,
    imageTwo: `${CLOUDINARY_SECURE_URL_BASE}/${storyShowcase?.imageTwo}`,
    imageThree: `${CLOUDINARY_SECURE_URL_BASE}/${storyShowcase?.imageThree}`,
    values: [
      ...storyShowcase.values.map((value: { icon: string }) => ({
        ...value,
        icon: `${CLOUDINARY_SECURE_URL_BASE}/${value.icon}`,
      })),
    ],
  };

  return apiResponse(
    true,
    200,
    "Story showcase has been fetched successfully!",
    data
  );
});
