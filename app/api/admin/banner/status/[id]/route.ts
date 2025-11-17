import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { bannerStatusSchema } from "@/lib/validation-schema";
import Banner from "@/model/Banner";

// Banner status update
export const PUT = asyncHandler(
  bannerStatusSchema,
  async (req, data, params) => {
    const { id } = params;

    const banner = await Banner.findById(id);
    if (!banner) return apiResponse(false, 404, "Banner not found!");

    await Banner.findByIdAndUpdate(id, data);

    return apiResponse(
      true,
      200,
      "Banner status has been updated successfully!"
    );
  },
  true
);
