"use server";

import { apiClient } from "@/lib/apiClient";

export async function getBanners() {
  return await apiClient("/api/admin/banner", {
    method: "GET",
    tags: ["banners"],
  });
}
