import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse, toObjectId } from "@/lib/utils";
import { bannerSchema } from "@/lib/validation-schema";
import Banner from "@/model/Banner";

// Update a banner
export const PUT = asyncFormDataHandler(
  bannerSchema.partial(),
  async (req, data, formData, params) => {
    const { id } = params;

    const banner = await Banner.findById(id);
    if (!banner) return apiResponse(false, 404, "Banner not found!");

    const updateImg = (formData.get("image") as File) ?? null;
    let imagePublicId = banner.image; // Keep existing image by default

    if (updateImg) {
      // Validate file
      const { valid, error } = fileValidator(updateImg);
      if (!valid) return apiResponse(false, 400, error!);

      // Upload to cloudinary
      const { public_id } = await uploadToCloudinary(updateImg, {
        folder: `${process.env.CLOUDINARY_FOLDER}/banner`,
      });

      imagePublicId = public_id; // Update with new image
      if (banner.image) deleteFromCloudinary(banner.image); // Delete old image from Cloudinary
    }

    const bannerData = { ...data, image: imagePublicId };
    await Banner.findByIdAndUpdate(id, bannerData);

    return apiResponse(true, 200, "Banner has been updated successfully!");
  },
  true
);

// Delete a banner
export const DELETE = asyncHandler<{ id: string }>(async (req, params) => {
  const { id } = params;

  const banner = await Banner.findById(id);
  if (!banner) return apiResponse(false, 404, "Banner not found!");

  // Delete image from Cloudinary if exists
  if (banner.image) deleteFromCloudinary(banner.image);

  await Banner.findByIdAndDelete(id);

  return apiResponse(true, 200, "Banner has been deleted successfully!");
}, true);

// Get a banner
export const GET = asyncHandler<{ id: string }>(async (req, params) => {
  const { id } = params;

  const [banner] = await Banner.aggregate([
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
  if (!banner) return apiResponse(false, 404, "Banner not found!");

  return apiResponse(
    true,
    200,
    "Single banner has been fetched successfully!",
    banner
  );
}, true);
