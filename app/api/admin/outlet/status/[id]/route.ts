import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { statusSchema } from "@/lib/validation-schema";
import Outlet from "@/model/Outlet";

// Outlet status update
export const PUT = asyncHandler(
  statusSchema,
  async (req, data, params) => {
    const { id } = params;

    const outlet = await Outlet.findById(id);
    if (!outlet) return apiResponse(false, 404, "Outlet not found!");

    await Outlet.findByIdAndUpdate(id, data);

    return apiResponse(
      true,
      200,
      "Outlet status has been updated successfully!"
    );
  },
  true
);
