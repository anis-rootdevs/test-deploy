"use server";

import { apiClient } from "@/lib/apiClient";
import { revalidateTag } from "next/cache";

export async function getShortsTable(data: any) {
  const result = await apiClient("/api/admin/banner/sort", {
    method: "PUT",
    body: data,
  });
  revalidateTag("banners", "");
  return result;
}
