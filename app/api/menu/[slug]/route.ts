import { getCache } from "@/config/cache";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Category from "@/model/Category";
import { NextRequest } from "next/server";

// Get all product with in a category by slug
export const GET = asyncHandler(async (req: NextRequest, params) => {
  const cache = getCache();
  const { slug } = params;

  const cachedData = cache.get(slug);

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
        slug,
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
              createdAt: -1, // Sort products by newest first
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              shortDesc: 1,
              price: 1,
              image: {
                $cond: {
                  if: { $ne: ["$image", null] },
                  then: {
                    $concat: [CLOUDINARY_SECURE_URL_BASE, "/", "$image"],
                  },
                  else: null,
                },
              },
              mostLoved: 1,
              featured: 1,
              createdAt: 1,
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

  if (data.length === 0) {
    return apiResponse(
      false,
      404,
      "No products found for the given category slug!",
      null
    );
  }

  cache.set(slug, data[0]);

  return apiResponse(
    true,
    200,
    "Category wise product has been fetched successfully!",
    data[0]
  );
});
