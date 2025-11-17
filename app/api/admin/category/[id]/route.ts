import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { categorySchema } from "@/lib/validation-schema";
import Category from "@/model/Category";

// Update a category
export const PUT = asyncHandler(
  categorySchema.partial(),
  async (req, data, params) => {
    const category = await Category.findOne({ _id: params.id });
    if (!category) return apiResponse(false, 404, "Category not found!");

    const [exists, slugExists] = await Promise.all([
      Category.findOne({ name: data.name, _id: { $ne: params.id } }),
      Category.findOne({ slug: data.slug, _id: { $ne: params.id } }),
    ]);

    if (exists) return apiResponse(false, 400, "This category already exists!");
    if (slugExists) return apiResponse(false, 400, "This slug already exists!");

    await Category.findOneAndUpdate({ _id: params.id }, data);

    return apiResponse(true, 201, "Category has been updated successfully!");
  }
);

// Delete a category
export const DELETE = asyncHandler(async (req, params) => {
  const category = await Category.findOne({ _id: params.id });
  if (!category) return apiResponse(false, 404, "Category not found!");

  await Category.findOneAndDelete({ _id: params.id });

  return apiResponse(true, 201, "Category has been deleted successfully!");
});
