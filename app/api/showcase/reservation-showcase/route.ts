import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse, formatBusinessHours } from "@/lib/utils";
import Settings from "@/model/Settings";
import Showcase from "@/model/Showcase";

export const GET = asyncHandler(async () => {
  const { reservationShowcase } = (await Showcase.findOne({})).toObject();

  const settings = await Settings.findOne({}).select("businessHours");

  if (!settings || !settings.businessHours) {
    return apiResponse(true, 200, "No business hour settings found!");
  }

  // Sort business hours by dayOfWeek for consistent response
  const sortedBusinessHours = [...settings.businessHours].sort(
    (a, b) => a.dayOfWeek - b.dayOfWeek
  );

  const data = {
    ...reservationShowcase,
    lightImage: `${CLOUDINARY_SECURE_URL_BASE}/${reservationShowcase?.lightImage}`,
    darkImage: `${CLOUDINARY_SECURE_URL_BASE}/${reservationShowcase?.darkImage}`,
    businessHour: formatBusinessHours(sortedBusinessHours),
  };

  return apiResponse(
    true,
    200,
    "Reservation showcase has been fetched successfully!",
    data
  );
});
