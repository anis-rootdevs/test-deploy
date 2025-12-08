"use server";

import { apiClient } from "@/lib/api-client";

export async function getMenuList() {
  try {
    const res = await apiClient("/api/menu", {
      method: "GET",
      tags: ["menu"],
      revalidate: 20,
    });
    console.log(res);

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get all menu",
      data: [],
    };
  }
}
export async function getMenuCold() {
  try {
    const res = await apiClient("/api/menu/cold-cofee", {
      method: "GET",
      tags: ["menu"],
      revalidate: 300,
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
