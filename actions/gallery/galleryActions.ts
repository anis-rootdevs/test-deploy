"use server";

import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

export async function getGalleryLists(page: number, limit: number) {
  try {
    const res = await apiClient(
      `/api/admin/gallery?page=${page}&limit=${limit}`,
      {
        method: "GET",
        tags: ["gallery"],
      }
    );

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get gallery list",
      data: null,
    };
  }
}

export async function createGallery(data: FormData) {
  try {
    const res = await apiClient("/api/admin/gallery", {
      method: "POST",
      body: data,
      isFormData: true,
    });
    if (res?.status) {
      updateTag("gallery");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to create gallery",
      data: null,
    };
  }
}

export async function updateGallery(id: string, data: FormData) {
  try {
    const res = await apiClient(`/api/admin/gallery/${id}`, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("gallery");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to update gallery",
      data: null,
    };
  }
}

export async function deleteGallery(id: string) {
  try {
    const res = await apiClient(`/api/admin/gallery/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      updateTag("gallery");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to delete gallery",
      data: null,
    };
  }
}

export async function changeGalleryStatus(id: string, status: boolean) {
  try {
    const res = await apiClient(`/api/admin/gallery/status/${id}`, {
      method: "PUT",
      body: { status },
      cache: "no-store",
    });

    if (res?.status) {
      updateTag("gallery");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update gallery status",
      data: null,
    };
  }
}
export async function shortsGalleryTable(data: { sortedIds: string[] }) {
  try {
    const res = await apiClient("/api/admin/gallery/sort", {
      method: "PUT",
      body: data,
    });
    if (res?.status) {
      updateTag("gallery");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to shorts gallery",
      data: null,
    };
  }
}

export async function getAllFeaturedGallery(limit: number) {
  try {
    const res = await apiClient(`/api/gallery/featured?limit=${limit}`, {
      method: "GET",
      // tags: ["gallery"],
      cache: "no-store",
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get galleries",
      data: null,
    };
  }
}
export async function getAllGalleries(limit: number, page: number) {
  try {
    const res = await apiClient(
      `/api/gallery/all?limit=${limit}&page=${page}`,
      {
        method: "GET",
        // tags: ["gallery"],
        cache: "no-store",
      }
    );
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get all galleries",
      data: null,
    };
  }
}
