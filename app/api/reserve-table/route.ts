import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { reserveTableSchema } from "@/lib/validation-schema";
import Outlet from "@/model/Outlet";
import ReserveTable from "@/model/ReserveTable";

// Create a reserve table
export const POST = asyncHandler(reserveTableSchema, async (req, data) => {
  const outlet = await Outlet.findById(data.outlet);
  if (!outlet) return apiResponse(false, 404, "Outlet not found!");

  const requestQueue = await ReserveTable.findOne({
    email: data.email,
    status: "pending",
  });

  if (requestQueue) {
    return apiResponse(
      false,
      400,
      "You have a pending request. Please wait until it's processed!"
    );
  }

  await ReserveTable.create(data);

  return apiResponse(true, 201, "Reserve table has been created successfully!");
});
