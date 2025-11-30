"use server";

import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

export async function getAllShapeLists() {
  try {
    const res = await apiClient(`/api/admin/chef?limit`, {
      method: "GET",
      tags: ["shape"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get shape list",
      data: null,
    };
  }
}

export async function createShape(data: FormData) {
  try {
    const res = await apiClient("/api/admin/chef", {
      method: "POST",
      body: data,
      isFormData: true,
    });
    if (res?.status) {
      updateTag("shape");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to create new shape",
      data: null,
    };
  }
}

export async function updateShape(id: string, data: FormData) {
  try {
    const res = await apiClient(`/api/admin/chef/${id}`, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("shape");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to update Shape",
      data: null,
    };
  }
}

export async function deleteShape(id: string) {
  try {
    const res = await apiClient(`/api/admin/chef/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      updateTag("shape");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to delete shape",
      data: null,
    };
  }
}
export async function changeShapeStatus(id: string, status: boolean) {
  try {
    const res = await apiClient(`/api/admin/chef/status/${id}`, {
      method: "PUT",
      body: { status },
      cache: "no-store",
    });

    if (res?.status) {
      updateTag("shape");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update shape status",
      data: null,
    };
  }
}
export async function shortsShapeTable(data: { sortedIds: string[] }) {
  try {
    const res = await apiClient("/api/admin/chef/sort", {
      method: "PUT",
      body: data,
    });
    if (res?.status) {
      updateTag("shape");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to shorts shape",
      data: null,
    };
  }
}
