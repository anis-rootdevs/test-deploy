import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Gallery from "@/model/Gallery";
import { NextRequest } from "next/server";

// Get all featured galleries
export const GET = asyncHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 10;

  const galleries = await Gallery.aggregate([
    {
      $match: { featured: true },
    },
    {
      $sort: {
        position: 1,
      },
    },
    {
      $limit: Number(limit),
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
        status: 0,
        featured: 0,
        position: 0,
      },
    },
  ]);

  return apiResponse(
    true,
    200,
    "Galleries have been fetched successfully!",
    galleries
  );
});
