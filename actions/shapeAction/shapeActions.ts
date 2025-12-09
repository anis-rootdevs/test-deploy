"use server";

import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

export async function getAllChefLists() {
  try {
    const res = await apiClient(`/api/admin/chef?limit`, {
      method: "GET",
      tags: ["chef"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get chef list",
      data: [],
    };
  }
}

export async function createChef(data: FormData) {
  try {
    const res = await apiClient("/api/admin/chef", {
      method: "POST",
      body: data,
      isFormData: true,
    });
    if (res?.status) {
      updateTag("chef");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to create new chef",
      data: null,
    };
  }
}

export async function updateChef(id: string, data: FormData) {
  try {
    const res = await apiClient(`/api/admin/chef/${id}`, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("chef");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to update chef",
      data: null,
    };
  }
}

export async function deleteChef(id: string) {
  try {
    const res = await apiClient(`/api/admin/chef/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      updateTag("chef");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to delete chef",
      data: null,
    };
  }
}
export async function changeChefStatus(id: string, status: boolean) {
  try {
    const res = await apiClient(`/api/admin/chef/status/${id}`, {
      method: "PUT",
      body: { status },
      cache: "no-store",
    });

    if (res?.status) {
      updateTag("chef");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to update chef status",
      data: null,
    };
  }
}
export async function shortsChefTable(data: { sortedIds: string[] }) {
  try {
    const res = await apiClient("/api/admin/chef/sort", {
      method: "PUT",
      body: data,
    });
    if (res?.status) {
      updateTag("chef");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to shorts chef",
      data: null,
    };
  }
}

export async function getAllChefList() {
  try {
    const res = await apiClient(`/api/chef`, {
      method: "GET",
      tags: ["chef"],
      revalidate: 30,
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get all chef",
      data: [],
    };
  }
}
