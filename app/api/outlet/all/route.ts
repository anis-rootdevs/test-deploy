import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Outlet from "@/model/Outlet";

// Get all outlets
export const GET = asyncHandler(async () => {
  const data = await Outlet.aggregate([
    {
      $match: { status: true },
    },
    {
      $sort: {
        position: 1,
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
        position: 0,
      },
    },
  ]);

  return apiResponse(true, 200, "Outlets has been fetched successfully!", data);
});
