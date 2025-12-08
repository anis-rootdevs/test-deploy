"use server";

import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

export async function getBanners() {
  try {
    const res = await apiClient("/api/admin/banner", {
      method: "GET",
      tags: ["banners"],
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get banner list",
      data: null,
    };
  }
}

export async function getBannerById(id: string) {
  try {
    const res = await apiClient(`/api/admin/banner/${id}`, {
      method: "GET",
      tags: ["banners"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch banner data",
      data: null,
    };
  }
}

export async function createBanner(formData: FormData) {
  try {
    const res = await apiClient(`/api/admin/banner`, {
      method: "POST",
      body: formData,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("banners");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to create banner",
      data: null,
    };
  }
}

export async function updateBanner(id: string, formData: FormData) {
  try {
    const res = await apiClient(`/api/admin/banner/${id}`, {
      method: "PUT",
      body: formData,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("banners");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to update banner",
      data: null,
    };
  }
}

export async function shortsTable(data: any) {
  try {
    const res = await apiClient("/api/admin/banner/sort", {
      method: "PUT",
      body: data,
    });
    if (res?.status) {
      updateTag("banners");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to shorts banner",
      data: null,
    };
  }
}

export async function deleteBanner(id: string) {
  try {
    const res = await apiClient(`/api/admin/banner/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      updateTag("banners");
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

export async function changeStatus(id: string, status: boolean) {
  try {
    const res = await apiClient(`/api/admin/banner/status/${id}`, {
      method: "PUT",
      body: { status },
      cache: "no-store",
    });

    if (res?.status) {
      updateTag("banners");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update banner status",
      data: null,
    };
  }
}

export async function getBanner() {
  try {
    const res = await apiClient("/api/banner", {
      method: "GET",
      tags: ["banners"],
      revalidate: 300, // 5 minutes (5 × 60 = 300 seconds)
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get active banner list",
      data: null,
    };
  }
}
