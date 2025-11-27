import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { statusSchema } from "@/lib/validation-schema";
import Chef from "@/model/Chef";

// Chef status update
export const PUT = asyncHandler(
  statusSchema,
  async (req, data, params) => {
    const { id } = params;

    const chef = await Chef.findById(id);
    if (!chef) return apiResponse(false, 404, "Chef not found!");

    await Chef.findByIdAndUpdate(id, data);

    return apiResponse(true, 200, "Chef status has been updated successfully!");
  },
  true
);
