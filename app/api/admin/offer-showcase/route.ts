import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { offerShowcaseSchema } from "@/lib/validation-schema";
import Showcase from "@/model/Showcase";
import { NextRequest } from "next/server";
import z from "zod";
import { productIdChecker } from "./service";

// Update Offer Showcase
export const PUT = asyncFormDataHandler(
  offerShowcaseSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof offerShowcaseSchema>,
    formData: FormData
  ) => {
    // Fetch existing showcase data
    const showcase = await Showcase.findOne({});
    const existingShowcase = showcase?.offerShowcase;

    const { valid, error } = await productIdChecker(data.products);
    if (!valid) return apiResponse(false, 400, error!);

    const file = formData.get("image");
    let imagePublicId = null;

    if (file) {
      const { valid, error } = fileValidator(file as File, {
        required: false,
      });
      if (!valid) return apiResponse(false, 400, error!);

      // Delete existing image from Cloudinary if it exists
      if (existingShowcase?.["image"]) {
        await deleteFromCloudinary(existingShowcase["image"]);
      }

      // Upload new image to Cloudinary
      const { public_id } = await uploadToCloudinary(file as File, {
        folder: `${process.env.CLOUDINARY_FOLDER}/showcase`,
      });

      imagePublicId = public_id;
    }

    // Build $set object with only the fields being updated
    const updateFields = Object.entries({
      ...data,
      image: imagePublicId,
    }).reduce((acc, [key, value]) => {
      acc[`offerShowcase.${key}`] = value;
      return acc;
    }, {} as Record<string, any>);

    await Showcase.findOneAndUpdate(
      {},
      { $set: updateFields },
      { upsert: true }
    );

    return apiResponse(
      true,
      200,
      "Offer Showcase has been updated successfully!"
    );
  },
  true
);

export const GET = asyncHandler(async () => {
  const [result] = await Showcase.aggregate([
    { $limit: 1 },
    {
      $lookup: {
        from: "products",
        localField: "offerShowcase.products",
        foreignField: "_id",
        as: "offerShowcase.products",
        pipeline: [
          {
            $project: {
              name: 1,
              price: 1,
              image: 1,
              shortDesc: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        "offerShowcase.image": {
          $concat: [`${CLOUDINARY_SECURE_URL_BASE}/`, "$offerShowcase.image"],
        },
        "offerShowcase.products": {
          $map: {
            input: "$offerShowcase.products",
            as: "product",
            in: {
              $mergeObjects: [
                "$$product",
                {
                  image: {
                    $concat: [
                      `${CLOUDINARY_SECURE_URL_BASE}/`,
                      "$$product.image",
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        offerShowcase: 1,
      },
    },
  ]);

  if (!result || !result.offerShowcase) {
    return apiResponse(false, 404, "Offer showcase not found!");
  }

  return apiResponse(
    true,
    200,
    "Offer showcase has been fetched successfully!",
    result.offerShowcase
  );
}, true);
