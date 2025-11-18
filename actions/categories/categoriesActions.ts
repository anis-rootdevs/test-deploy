"use server";

import { apiClient } from "@/lib/api-client";
import { Category } from "@/lib/types";
import { updateTag } from "next/cache";

export async function getCategoriesList() {
  try {
    const res = await apiClient("/api/admin/category", {
      method: "GET",
      tags: ["categories"],
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get categories list",
      data: null,
    };
  }
}

export async function createCategory(data: Category) {
  try {
    const res = await apiClient("/api/admin/category", {
      method: "POST",
      body: data,
    });
    if (res?.status) {
      updateTag("categories");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to create category",
      data: null,
    };
  }
}

export async function updateCategory(id: string, data: Category) {
  try {
    const res = await apiClient(`/api/admin/category/${id}`, {
      method: "PUT",
      body: data,
    });

    if (res?.status) {
      updateTag("categories");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to update category",
      data: null,
    };
  }
}

export async function deleteCategory(id: string) {
  try {
    const res = await apiClient(`/api/admin/category/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      updateTag("categories");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to delete category",
      data: null,
    };
  }
}

export async function shortsCategoryTable(data: { sortedIds: string[] }) {
  try {
    const res = await apiClient("/api/admin/category/sort", {
      method: "PUT",
      body: data,
    });
    if (res?.status) {
      updateTag("categories");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to shorts category",
      data: null,
    };
  }
}

export async function changeCategoryStatus(id: string, status: boolean) {
  try {
    const res = await apiClient(`/api/admin/category/status/${id}`, {
      method: "PUT",
      body: { status },
      cache: "no-store",
    });

    if (res?.status) {
      updateTag("categories");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update category status",
      data: null,
    };
  }
}
