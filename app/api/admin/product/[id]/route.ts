import { deleteFromCloudinary, uploadToCloudinary } from "@/config/cloudinary";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse } from "@/lib/utils";
import { productSchema } from "@/lib/validation-schema";
import Product from "@/model/Product";

// Update a product
export const PUT = asyncFormDataHandler(
  productSchema.partial(),
  async (req, data, formData, params) => {
    const { id } = params;

    const product = await Product.findById(id);
    if (!product) return apiResponse(false, 404, "Product not found!");

    const updateImg = (formData.get("image") as File) ?? null;
    let imagePublicId = product.image; // Keep existing image by default

    if (updateImg) {
      // Validate file
      const { valid, error } = fileValidator(updateImg);
      if (!valid) return apiResponse(false, 400, error!);

      // Upload to cloudinary
      const { public_id } = await uploadToCloudinary(updateImg, {
        folder: `${process.env.CLOUDINARY_FOLDER}/product`,
      });

      imagePublicId = public_id; // Update with new image
      if (product.image) deleteFromCloudinary(product.image); // Delete old image from Cloudinary
    }

    const productData = { ...data, image: imagePublicId };
    await Product.findByIdAndUpdate(id, productData);

    return apiResponse(true, 200, "Product has been updated successfully!");
  },
  true
);

// Delete a product
export const DELETE = asyncHandler<{ id: string }>(async (req, params) => {
  const { id } = params;

  const product = await Product.findById(id);
  if (!product) return apiResponse(false, 404, "Product not found!");

  // Delete image from Cloudinary if exists
  if (product.image) deleteFromCloudinary(product.image);

  await Product.findByIdAndDelete(id);

  return apiResponse(true, 200, "Product has been deleted successfully!");
}, true);
