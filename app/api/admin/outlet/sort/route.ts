import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { sortSchema } from "@/lib/validation-schema";
import Outlet from "@/model/Outlet";

// Outlet Sorting
export const PUT = asyncHandler(
  sortSchema,
  async (req, data) => {
    const { sortedIds } = data;

    const bulkOps = sortedIds.map((item, index) => ({
      updateOne: {
        filter: { _id: item },
        update: { position: index + 1 },
      },
    }));

    await Outlet.bulkWrite(bulkOps, { ordered: false });

    return apiResponse(true, 200, "Outlet has been sorted successfully!");
  },
  true
);
