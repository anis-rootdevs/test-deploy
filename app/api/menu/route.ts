import { getCache } from "@/config/cache";
import { CACHE_KEYS, CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Category from "@/model/Category";

// Get all group with products
export const GET = asyncHandler(async () => {
  const cache = getCache();
  const cachedData = cache.get(CACHE_KEYS.MENU);

  if (cachedData) {
    return apiResponse(
      true,
      200,
      "Category wise product has been fetched successfully!",
      cachedData
    );
  }

  const data = await Category.aggregate([
    {
      $match: {
        status: true,
      },
    },
    {
      $sort: {
        position: 1,
      },
    },
    {
      $lookup: {
        from: "products",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$category", "$$categoryId"] },
              status: true, // Only active products
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              shortDesc: 1,
              price: 1,
              createdAt: 1,
              image: {
                $cond: {
                  if: { $ne: ["$image", null] },
                  then: {
                    $concat: [CLOUDINARY_SECURE_URL_BASE, "/", "$image"],
                  },
                  else: null,
                },
              },
            },
          },
        ],
        as: "products",
      },
    },
    {
      $match: {
        "products.0": { $exists: true }, // Only include categories that have products
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        products: 1,
      },
    },
  ]);

  cache.set(CACHE_KEYS.MENU, data);

  return apiResponse(
    true,
    200,
    "Category wise product has been fetched successfully!",
    data
  );
});
