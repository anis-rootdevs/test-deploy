import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse, toObjectId } from "@/lib/utils";
import { chefSchema } from "@/lib/validation-schema";
import Chef from "@/model/Chef";

// Update a chef
export const PUT = asyncFormDataHandler(
  chefSchema.partial(),
  async (req, data, formData, params) => {
    const { id } = params;

    const chef = await Chef.findById(id);
    if (!chef) return apiResponse(false, 404, "Chef not found!");

    const updateImg = (formData.get("image") as File) ?? null;
    let imagePublicId = chef.image; // Keep existing image by default

    if (updateImg) {
      // Validate file
      const { valid, error } = fileValidator(updateImg);
      if (!valid) return apiResponse(false, 400, error!);

      // Upload to cloudinary
      const { public_id } = await uploadToCloudinary(updateImg, {
        folder: `${process.env.CLOUDINARY_FOLDER}/chef`,
      });

      imagePublicId = public_id; // Update with new image
      if (chef.image) deleteFromCloudinary(chef.image); // Delete old image from Cloudinary
    }

    const chefData = { ...data, image: imagePublicId };
    await Chef.findByIdAndUpdate(id, chefData);
    return apiResponse(true, 200, "Chef has been updated successfully!");
  },
  true
);

// Delete a chef
export const DELETE = asyncHandler<{ id: string }>(async (req, params) => {
  const { id } = params;

  const chef = await Chef.findById(id);
  if (!chef) return apiResponse(false, 404, "Chef not found!");

  // Delete image from Cloudinary if exists
  if (chef.image) deleteFromCloudinary(chef.image);

  await Chef.findByIdAndDelete(id);

  return apiResponse(true, 200, "Chef has been deleted successfully!");
}, true);

// Get a chef
export const GET = asyncHandler<{ id: string }>(async (req, params) => {
  const { id } = params;

  const [chef] = await Chef.aggregate([
    {
      $match: {
        _id: toObjectId(id),
      },
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
  if (!chef) return apiResponse(false, 404, "Chef not found!");

  return apiResponse(
    true,
    200,
    "Single chef has been fetched successfully!",
    chef
  );
}, true);
