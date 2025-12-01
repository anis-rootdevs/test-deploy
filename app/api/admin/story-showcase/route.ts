import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { IExistingValue } from "@/lib/types";
import { apiResponse } from "@/lib/utils";
import { storyShowcaseSchema } from "@/lib/validation-schema";
import Showcase from "@/model/Showcase";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import z from "zod";

// Update Story Showcase
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

    // Handle main images (imageOne, imageTwo, imageThree)
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

    // Handle values array with CRUD operations
    const values = data.values || [];
    const existingValues = (existingShowcase?.values || []) as IExistingValue[];

    // Map existing values by _id for quick lookup
    const existingValuesMap = new Map<string, IExistingValue>(
      existingValues.map((val) => [val._id?.toString() || "", val])
    );

    const toCreate: any[] = [];
    const toUpdate: any[] = [];
    const toDelete: string[] = [];
    const incomingIds: string[] = [];

    // Process incoming values
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      let iconPublicId = value.icon;
      if (value._id && existingValuesMap.get(value._id)) {
        iconPublicId = existingValuesMap.get(value._id)?.icon || "";
      }

      // Handle icon upload
      const iconFile = formData.get(`values[${i}].icon`);

      if (iconFile && iconFile instanceof File) {
        const { valid, error } = fileValidator(iconFile, {
          required: false,
        });
        if (!valid) return apiResponse(false, 400, error!);

        // Delete existing icon if updating
        if (value._id) {
          const existingValue = existingValuesMap.get(value._id);
          if (existingValue?.icon) {
            await deleteFromCloudinary(existingValue.icon);
          }
        }

        // Upload new icon
        const { public_id } = await uploadToCloudinary(iconFile, {
          folder: `${process.env.CLOUDINARY_FOLDER}/showcase/values`,
        });

        iconPublicId = public_id;
      }

      // Categorize operations
      if (value._delete && value._id) {
        // Mark for deletion
        toDelete.push(value._id);

        // Delete icon from Cloudinary
        const existingValue = existingValuesMap.get(value._id);
        if (existingValue?.icon) {
          await deleteFromCloudinary(existingValue.icon);
        }
      } else if (value._id) {
        // Update existing
        toUpdate.push({
          _id: value._id,
          title: value.title,
          shortDesc: value.shortDesc,
          icon: iconPublicId,
        });
        incomingIds.push(value._id);
      } else {
        // Create new
        toCreate.push({
          title: value.title,
          shortDesc: value.shortDesc,
          icon: iconPublicId,
        });
      }
    }

    // Find implicit deletes (existing items not in incoming data)
    const existingIds = Array.from(existingValuesMap.keys());
    const implicitDeletes = existingIds.filter(
      (existingId) =>
        !incomingIds.includes(existingId) && !toDelete.includes(existingId)
    );

    // Delete icons for implicit deletes
    for (const id of implicitDeletes) {
      const existingValue = existingValuesMap.get(id);
      if (existingValue?.icon) {
        await deleteFromCloudinary(existingValue.icon);
      }
    }

    toDelete.push(...implicitDeletes);

    // Build the final values array
    const finalValues = [
      ...toCreate.map((item) => ({
        _id: new mongoose.Types.ObjectId(),
        ...item,
      })),
      ...toUpdate,
    ];

    // Build update object
    const updateFields: Record<string, any> = {
      ...Object.entries({ ...data, ...uploadedImages }).reduce(
        (acc, [key, value]) => {
          if (key !== "values") {
            acc[`storyShowcase.${key}`] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      ),
      "storyShowcase.values": finalValues,
    };

    await Showcase.findOneAndUpdate(
      {},
      { $set: updateFields },
      { upsert: true, new: true }
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
        ...(value.icon && {
          icon: `${CLOUDINARY_SECURE_URL_BASE}/${value.icon}`,
        }),
      })),
    ],
  };

  return apiResponse(
    true,
    200,
    "Story showcase has been fetched successfully!",
    data
  );
}, true);
