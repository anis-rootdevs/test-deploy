import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Chef from "@/model/Chef";

// Get all chefs
export const GET = asyncHandler(async () => {
  const chefs = await Chef.aggregate([
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

  return apiResponse(true, 200, "Chefs has been fetched successfully!", chefs);
});
