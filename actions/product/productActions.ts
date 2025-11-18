"use server";

import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

interface GetProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  category?: string;
}

export async function getProductList(params: GetProductListParams = {}) {
  try {
    const { page = 1, limit = 10, search, sortBy, category } = params;

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add optional parameters only if they exist
    if (search) queryParams.append("search", search);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (category) queryParams.append("category", category);

    const res = await apiClient(
      `/api/admin/product?${queryParams.toString()}`,
      {
        method: "GET",
        tags: ["product"],
      }
    );

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
    const res = await apiClient(`/api/admin/category/status/${id}`, {
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
