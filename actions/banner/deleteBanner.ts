"use server";

import { apiClient } from "@/lib/apiClient";
import { revalidateTag } from "next/cache";

export async function deleteBanner(id: string) {
  try {
    const res = await apiClient(`/api/admin/banner/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      revalidateTag("banners", "");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to delete banner",
      data: null,
    };
  }
}
