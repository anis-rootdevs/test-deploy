import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { sortSchema } from "@/lib/validation-schema";
import Category from "@/model/Category";

// Category Sorting
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

    await Category.bulkWrite(bulkOps, { ordered: false });

    return apiResponse(true, 200, "Category has been sorted successfully!");
  },
  true
);
