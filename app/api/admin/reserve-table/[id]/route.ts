import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { reserveStatusSchema } from "@/lib/validation-schema";
import ReserveTable from "@/model/ReserveTable";

// Update a reserve table status
export const PUT = asyncHandler(
  reserveStatusSchema,
  async (req, data, params) => {
    const { id } = params;

    const reserveTable = await ReserveTable.findById(id);
    if (!reserveTable) {
      return apiResponse(false, 404, "Reserve table not found!");
    }

    const { status } = data;

    await ReserveTable.findByIdAndUpdate(id, { status });

    return apiResponse(
      true,
      200,
      "Reserve table status has been updated successfully!"
    );
  },
  true
);
