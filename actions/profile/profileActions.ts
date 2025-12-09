"use server";

import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

export async function updateAdminPassword(data: any) {
  try {
    const res = await apiClient(`/api/admin/auth/password`, {
      method: "PUT",
      body: data,
      cache: "no-store",
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update updateAdminPassword",
      data: null,
    };
  }
}

export async function getAdminProfile() {
  try {
    const res = await apiClient("/api/admin/auth/me", {
      method: "GET",
      tags: ["profile"],
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get admin profile",
      data: [],
    };
  }
}

export async function updateAdminProfile(data: any) {
  try {
    const res = await apiClient(`/api/admin/auth/me`, {
      method: "PUT",
      body: data,
      cache: "no-store",
    });

    if (res?.status) {
      updateTag("profile");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update updateAdminProfile",
      data: null,
    };
  }
}
