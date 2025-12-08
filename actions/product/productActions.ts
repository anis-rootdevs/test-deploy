"use server";

import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

interface GetProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  category?: string;
  tag?: string;
}

export async function getProductList(
  page: number,
  limit: number,
  search: string,
  filters: Record<string, unknown>
) {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search: search || "",
    });

    // Append filters dynamically
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.append(k, String(v));
    });

    const res = await apiClient(`/api/admin/product?${params.toString()}`, {
      method: "GET",
      tags: ["product"],
      revalidate: 30,
      // cache: "no-store",
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get products list",
      data: null,
    };
  }
}

export async function createProduct(data: FormData) {
  try {
    const res = await apiClient("/api/admin/product", {
      method: "POST",
      body: data,
      isFormData: true,
    });
    if (res?.status) {
      updateTag("product");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to create product",
      data: null,
    };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const res = await apiClient(`/api/admin/product/${id}`, {
      method: "PUT",
      body: formData,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("product");
      updateTag("menu");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to update product",
      data: null,
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await apiClient(`/api/admin/product/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      updateTag("product");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to delete Product",
      data: null,
    };
  }
}

export async function shortsProductTable(data: any) {
  try {
    const res = await apiClient("/api/admin/banner/sort", {
      method: "PUT",
      body: data,
    });
    if (res?.status) {
      updateTag("product");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to shorts product",
      data: null,
    };
  }
}

export async function changeProductStatus(id: string, status: boolean) {
  try {
    const res = await apiClient(`/api/admin/product/status/${id}`, {
      method: "PUT",
      body: { status },
      cache: "no-store",
    });

    if (res?.status) {
      updateTag("product");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update product status",
      data: null,
    };
  }
}

export async function getMostLovedProducts(limit: number) {
  try {
    const res = await apiClient(`/api/product/most-loved?limit=${limit}`, {
      method: "GET",
      tags: ["product"], // ✅ Added tags
      revalidate: 300,
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get most loved products",
      data: null,
    };
  }
}
export async function getFeaturedProducts(limit: number) {
  try {
    const res = await apiClient(`/api/product/featured?limit=${limit}`, {
      method: "GET",
      tags: ["product"],
      revalidate: 300,
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get featured products",
      data: null,
    };
  }
}

export async function getProductById(id: string) {
  try {
    const res = await apiClient(`/api/admin/product/${id}`, {
      method: "GET",
      tags: ["product"],
      revalidate: 30,
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch product data",
      data: null,
    };
  }
}

export async function getNewProducts(limit: number) {
  try {
    const res = await apiClient(`/api/product/new?limit=${limit}`, {
      method: "GET",
      tags: ["product"],
      revalidate: 30,
      // cache: "force-cache",
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get new products",
      data: null,
    };
  }
}
