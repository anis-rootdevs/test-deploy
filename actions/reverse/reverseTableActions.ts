"use server";

import { apiClient } from "@/lib/api-client";
import { ReverseTable } from "@/lib/types";
import { updateTag } from "next/cache";

interface GetReversedParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  category?: string;
  status?: string;
}

export async function getReversedList(params: GetReversedParams = {}) {
  try {
    const { page = 1, limit = 10, search, sortBy, category, status } = params;

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add optional parameters only if they exist
    if (search) queryParams.append("search", search);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (category) queryParams.append("category", category);
    if (status) queryParams.append("status", status);

    const res = await apiClient(
      `/api/admin/reserve-table?${queryParams.toString()}`,
      {
        method: "GET",
        tags: ["reserve"],
        cache: "no-store",
      }
    );

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get booked list",
      data: null,
    };
  }
}

export async function createReverseTable(data: Omit<ReverseTable, "_id">) {
  try {
    const res = await apiClient("/api/reserve-table", {
      method: "POST",
      body: data,
    });
    if (res?.status) {
      updateTag("reserve");
    }
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create reverse table",
      data: null,
    };
  }
}

export async function changeReservationStatus(
  reservedId: string,
  status: "pending" | "confirmed" | "cancelled"
) {
  try {
    const res = await apiClient(`/api/admin/reserve-table/${reservedId}`, {
      method: "PUT",
      body: { status },
    });

    if (res?.status) {
      updateTag("reserve");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      status: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update reservation status",
      data: null,
    };
  }
}

export async function deleteReserveList(id: string) {
  try {
    const res = await apiClient(`/api/admin/reserve-table/${id}`, {
      method: "DELETE",
    });

    if (res?.status) {
      updateTag("reserve");
    }

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete Reserve List",
      data: null,
    };
  }
}
