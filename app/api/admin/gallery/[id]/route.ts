import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse, toObjectId } from "@/lib/utils";
import { gallerySchema } from "@/lib/validation-schema";
import Gallery from "@/model/Gallery";

// Update a gallery
export const PUT = asyncFormDataHandler(
  gallerySchema.partial(),
  async (req, data, formData, params) => {
    const { id } = params;

    const gallery = await Gallery.findById(id);
    if (!gallery) return apiResponse(false, 404, "Gallery not found!");

    const updateImg = (formData.get("image") as File) ?? null;
    let imagePublicId = gallery.image; // Keep existing image by default

    if (updateImg) {
      // Validate file
      const { valid, error } = fileValidator(updateImg);
      if (!valid) return apiResponse(false, 400, error!);

      // Upload to cloudinary
      const { public_id } = await uploadToCloudinary(updateImg, {
        folder: `${process.env.CLOUDINARY_FOLDER}/gallery`,
      });

      imagePublicId = public_id; // Update with new image
      if (gallery.image) deleteFromCloudinary(gallery.image); // Delete old image from Cloudinary
    }

    const galleryData = { ...data, image: imagePublicId };
    await Gallery.findByIdAndUpdate(id, galleryData);

    return apiResponse(true, 200, "Gallery has been updated successfully!");
  },
  true
);

// Delete a gallery
export const DELETE = asyncHandler<{ id: string }>(async (req, params) => {
  const { id } = params;

  const gallery = await Gallery.findById(id);
  if (!gallery) return apiResponse(false, 404, "Gallery not found!");

  // Delete image from Cloudinary if exists
  if (gallery.image) deleteFromCloudinary(gallery.image);

  await Gallery.findByIdAndDelete(id);

  return apiResponse(true, 200, "Gallery has been deleted successfully!");
}, true);

// Get a gallery
export const GET = asyncHandler<{ id: string }>(async (req, params) => {
  const { id } = params;

  const [gallery] = await Gallery.aggregate([
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
    {
      $project: {
        updatedAt: 0,
      },
    },
  ]);
  if (!gallery) return apiResponse(false, 404, "Gallery not found!");

  return apiResponse(
    true,
    200,
    "Single gallery has been fetched successfully!",
    gallery
  );
}, true);
