import { flushAllCache, getCacheStats } from "@/config/cache";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";

export const GET = asyncHandler(async () => {
  flushAllCache();

  return apiResponse(
    true,
    200,
    "Cache has been cleared successfully!",
    getCacheStats()
  );
});
