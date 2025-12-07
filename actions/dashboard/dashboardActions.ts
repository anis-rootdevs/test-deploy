"use server";
import { apiClient } from "@/lib/api-client";

export async function getDashboardStatistics() {
  try {
    const res = await apiClient(`/api/admin/dashboard`, {
      method: "GET",
      tags: ["statistics"],
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get dashboard Statistics",
      data: null,
    };
  }
}
