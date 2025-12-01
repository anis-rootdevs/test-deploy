"use server";

import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

export async function getOutletsList(
  page: number,
  limit: number,
  search: string
) {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search: search || "",
    });
    const res = await apiClient(`/api/admin/outlet?${params.toString()}`, {
      method: "GET",
      tags: ["outlets"],
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get outlets list",
      data: null,
    };
  }
}

export async function createOutlets(data: FormData) {
  try {
    const res = await apiClient("/api/admin/outlet", {
      method: "POST",
      body: data,
      isFormData: true,
    });
    if (res?.status) {
      updateTag("outlets");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to outlets category",
      data: null,
    };
  }
}

export async function updateOutlets(id: string, data: FormData) {
  try {
    const res = await apiClient(`/api/admin/outlet/${id}`, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("outlets");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to update outlets",
      data: null,
    };
  }
}

export async function deleteOutlet(id: string) {
  try {
    const res = await apiClient(`/api/admin/outlet/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      updateTag("outlets");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to delete outlets",
      data: null,
    };
  }
}

export async function changeOutletsStatus(id: string, status: boolean) {
  try {
    const res = await apiClient(`/api/admin/outlet/status/${id}`, {
      method: "PUT",
      body: { status },
      cache: "no-store",
    });

    if (res?.status) {
      updateTag("outlets");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update outlets status",
      data: null,
    };
  }
}

export async function shortsOutletsTable(data: { sortedIds: string[] }) {
  try {
    const res = await apiClient("/api/admin/outlet/sort", {
      method: "PUT",
      body: data,
    });
    if (res?.status) {
      updateTag("outlets");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to shorts outlets",
      data: null,
    };
  }
}

export async function getAllOutlets() {
  try {
    const res = await apiClient(`/api/outlet/all`, {
      method: "GET",
      // tags: ["outlets"],
      cache: "no-store",
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to get outlets",
      data: null,
    };
  }
}
