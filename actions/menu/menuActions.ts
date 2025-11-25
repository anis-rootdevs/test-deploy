"use server";

import { apiClient } from "@/lib/api-client";

export async function getMenuList() {
  try {
    const res = await apiClient("/api/menu", {
      method: "GET",
      tags: ["menu"],
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get menu list",
      data: null,
    };
  }
}
export async function getMenuCold() {
  try {
    const res = await apiClient("/api/menu/cold-cofee", {
      method: "GET",
      tags: ["menu"],
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get menu list",
      data: null,
    };
  }
}
