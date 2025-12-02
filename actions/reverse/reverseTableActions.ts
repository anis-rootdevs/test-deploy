"use server";

import { apiClient } from "@/lib/api-client";
import { CreateReverseTableInput } from "@/lib/types";
import { updateTag } from "next/cache";

interface GetReversedParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  category?: string;
  status?: string;
}

export async function getReversedList(
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

    const res = await apiClient(
      `/api/admin/reserve-table?${params.toString()}`,
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

export async function createReverseTable(data: CreateReverseTableInput) {
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
