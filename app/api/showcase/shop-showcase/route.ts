import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Showcase from "@/model/Showcase";

// Get shop showcase info
export const GET = asyncHandler(async () => {
  const { shopShowcase } = (await Showcase.findOne({})).toObject();

  const data = {
    ...shopShowcase,
    imageOne: `${CLOUDINARY_SECURE_URL_BASE}/${shopShowcase?.imageOne}`,
    imageTwo: `${CLOUDINARY_SECURE_URL_BASE}/${shopShowcase?.imageTwo}`,
    imageThree: `${CLOUDINARY_SECURE_URL_BASE}/${shopShowcase?.imageThree}`,
  };

  return apiResponse(
    true,
    200,
    "Shop showcase has been fetched successfully!",
    data
  );
});
