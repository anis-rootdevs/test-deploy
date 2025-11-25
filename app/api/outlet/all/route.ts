import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse, makePaginate } from "@/lib/utils";
import Outlet from "@/model/Outlet";
import { NextRequest } from "next/server";

// Get all outlets
export const GET = asyncHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const skip: number = (Number(page) - 1) * Number(limit);

  const [docs, total] = await Promise.all([
    Outlet.aggregate([
      {
        $match: { status: true },
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
                $concat: [CLOUDINARY_SECURE_URL_BASE, "/", "$image"],
              },
              else: null, // or a default image URL
            },
          },
        },
      },
    ]),
    Outlet.countDocuments(),
  ]);

  const data = makePaginate(docs, Number(page), Number(limit), skip, total);

  return apiResponse(true, 200, "Outlets has been fetched successfully!", data);
});
