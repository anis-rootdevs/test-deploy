import { asyncHandler } from "@/lib/async-handler";
import { apiResponse, makePaginate } from "@/lib/utils";
import Gallery from "@/model/Gallery";
import { NextRequest } from "next/server";

// Get all galleries
export const GET = asyncHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const skip: number = (Number(page) - 1) * Number(limit);
  const query: Record<string, any> = {
    status: true,
  };

  const [docs, total] = await Promise.all([
    Gallery.aggregate([
      {
        $match: query,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
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
                $concat: [
                  process.env.CLOUDINARY_SECURE_URL_BASE || "",
                  "/",
                  "$image",
                ],
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
    ]),
    Gallery.countDocuments(query),
  ]);

  const data = makePaginate(docs, Number(page), Number(limit), skip, total);

  return apiResponse(
    true,
    200,
    "Galleries have been fetched successfully!",
    data
  );
});
