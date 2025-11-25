import { RESERVE_TABLE_STATUS } from "@/config/constant";
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

// Delete a reserve table
export const DELETE = asyncHandler(async (req, params) => {
  const { id } = params;

  const reserveTable = await ReserveTable.findById(id);
  if (!reserveTable) {
    return apiResponse(false, 404, "Reserve table not found!");
  }

  if (reserveTable.status !== RESERVE_TABLE_STATUS.CANCELLED) {
    return apiResponse(
      false,
      400,
      "Only cancelled reserve tables can be deleted!"
    );
  }

  await ReserveTable.findByIdAndDelete(id);

  return apiResponse(true, 200, "Reserve table has been deleted successfully!");
}, true);
