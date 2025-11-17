import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { categorySchema } from "@/lib/validation-schema";
import Category from "@/model/Category";

// Create a category
export const POST = asyncHandler(categorySchema, async (req, data) => {
  const [exists, slugExists] = await Promise.all([
    Category.findOne({ name: data.name }),
    Category.findOne({ slug: data.slug }),
  ]);

  if (exists) return apiResponse(false, 400, "This category already exists!");
  if (slugExists) return apiResponse(false, 400, "This slug already exists!");

  await Category.create(data);

  return apiResponse(true, 201, "Category has been created successfully!");
});

// Get all categories
export const GET = asyncHandler(async () => {
  const categories = await Category.find().sort({ position: 1 });

  return apiResponse(
    true,
    200,
    "Categories has been fetched successfully!",
    categories
  );
}, true);
