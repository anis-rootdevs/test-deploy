import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Banner from "@/model/Banner";

// Get all banners
export const GET = asyncHandler(async () => {
  const banners = await Banner.aggregate([
    {
      $match: {
        status: true,
      },
    },
    {
      $sort: { position: 1 },
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
  ]);

  return apiResponse(
    true,
    200,
    "Banners has been fetched successfully!",
    banners
  );
});
