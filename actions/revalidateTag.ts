"use server";

import { revalidateTag } from "next/cache";

export async function revalidateBanners() {
  try {
    revalidateTag("banners", "");
    return { success: true, message: "Banners revalidated" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to revalidate" };
  }
}
