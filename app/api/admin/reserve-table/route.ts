import { asyncHandler } from "@/lib/async-handler";
import { apiResponse, makePaginate } from "@/lib/utils";
import ReserveTable from "@/model/ReserveTable";
import { NextRequest } from "next/server";

// Get all reserve tables
export const GET = asyncHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;

  const skip: number = (Number(page) - 1) * Number(limit);
  const query: Record<string, any> = search
    ? {
        $or: [
          { name: { $regex: new RegExp(search, "i") } },
          { email: { $regex: new RegExp(search, "i") } },
          { phone: { $regex: new RegExp(search, "i") } },
        ],
      }
    : {};

  if (status) query.status = status;

  const [docs, total] = await Promise.all([
    ReserveTable.aggregate([
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
        $lookup: {
          from: "outlets",
          localField: "outlet",
          foreignField: "_id",
          as: "outlet",
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$outlet",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          updatedAt: 0,
        },
      },
    ]),
    ReserveTable.countDocuments(query),
  ]);

  const data = makePaginate(docs, Number(page), Number(limit), skip, total);

  return apiResponse(
    true,
    200,
    "Reserve tables have been fetched successfully!",
    data
  );
}, true);
