import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Showcase from "@/model/Showcase";

export const GET = asyncHandler(async () => {
  const [result] = await Showcase.aggregate([
    { $limit: 1 },
    {
      $lookup: {
        from: "products",
        localField: "offerShowcase.products",
        foreignField: "_id",
        as: "offerShowcase.products",
        pipeline: [
          {
            $project: {
              name: 1,
              price: 1,
              image: 1,
              shortDesc: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        "offerShowcase.image": {
          $concat: [`${CLOUDINARY_SECURE_URL_BASE}/`, "$offerShowcase.image"],
        },
        "offerShowcase.products": {
          $map: {
            input: "$offerShowcase.products",
            as: "product",
            in: {
              $mergeObjects: [
                "$$product",
                {
                  image: {
                    $concat: [
                      `${CLOUDINARY_SECURE_URL_BASE}/`,
                      "$$product.image",
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        offerShowcase: 1,
      },
    },
  ]);

  if (!result || !result.offerShowcase) {
    return apiResponse(false, 404, "Offer showcase not found!");
  }

  return apiResponse(
    true,
    200,
    "Offer showcase has been fetched successfully!",
    result.offerShowcase
  );
});
