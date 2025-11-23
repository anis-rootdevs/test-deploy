import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Product from "@/model/Product";
import { NextRequest } from "next/server";

// Get all most loved products
export const GET = asyncHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit")) || 5;

  const mostLoved = await Product.aggregate([
    {
      $match: { mostLoved: true },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: Number(limit),
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: {
        path: "$categoryInfo",
        preserveNullAndEmptyArrays: true, // Keep products without category
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
        category: "$categoryInfo.name",
      },
    },
    {
      $project: {
        categoryInfo: 0,
        updatedAt: 0,
        featured: 0,
        mostLoved: 0,
        status: 0,
      },
    },
  ]);

  return apiResponse(
    true,
    200,
    "Most loved products has been fetched successfully!",
    mostLoved
  );
});
