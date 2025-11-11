import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import User from "@/model/User";
import { NextRequest } from "next/server";

export const GET = asyncHandler(async (req: NextRequest, user) => {
  const admin = await User.findOne({ _id: user?._id }).select("-password");

  return apiResponse(true, 200, "Admin profile fetched successfully!", admin);
}, true);
