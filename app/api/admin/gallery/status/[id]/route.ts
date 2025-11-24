import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { statusSchema } from "@/lib/validation-schema";
import Gallery from "@/model/Gallery";

// Gallery status update
export const PUT = asyncHandler(
  statusSchema,
  async (req, data, params) => {
    const { id } = params;

    const gallery = await Gallery.findById(id);
    if (!gallery) return apiResponse(false, 404, "Gallery not found!");

    await Gallery.findByIdAndUpdate(id, data);

    return apiResponse(
      true,
      200,
      "Gallery status has been updated successfully!"
    );
  },
  true
);
