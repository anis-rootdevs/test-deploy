import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { outletSchema } from "@/lib/validation-schema";
import Outlet from "@/model/Outlet";

// Update a outlet
export const PUT = asyncFormDataHandler(
  outletSchema.partial(),
  async (req, data, formData, params) => {
    const { id } = params;

    const outlet = await Outlet.findById(id);
    if (!outlet) return apiResponse(false, 404, "Outlet not found!");

    const updateImg = (formData.get("image") as File) ?? null;
    let imagePublicId = outlet.image; // Keep existing image by default

    if (updateImg) {
      // Validate file
      const { valid, error } = fileValidator(updateImg);
      if (!valid) return apiResponse(false, 400, error!);

      // Upload to cloudinary
      const { public_id } = await uploadToCloudinary(updateImg, {
        folder: `${process.env.CLOUDINARY_FOLDER}/outlet`,
      });

      imagePublicId = public_id; // Update with new image
      if (outlet.image) deleteFromCloudinary(outlet.image); // Delete old image from Cloudinary
    }

    const outletData = { ...data, image: imagePublicId };
    await Outlet.findByIdAndUpdate(id, outletData);

    return apiResponse(true, 200, "Outlet has been updated successfully!");
  },
  true
);

// Delete a outlet
export const DELETE = asyncHandler<{ id: string }>(async (req, params) => {
  const { id } = params;

  const outlet = await Outlet.findById(id);
  if (!outlet) return apiResponse(false, 404, "Outlet not found!");

  // Delete image from Cloudinary if exists
  if (outlet.image) deleteFromCloudinary(outlet.image);

  await Outlet.findByIdAndDelete(id);

  return apiResponse(true, 200, "Outlet has been deleted successfully!");
}, true);
