"use server";
import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";
export async function getShowcaseList() {
  try {
    const res = await apiClient(`/api/admin/shop-showcase`, {
      method: "GET",
      tags: ["showcase"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get show case list",
      data: null,
    };
  }
}

export async function updateShopShowcase(id: string, data: FormData) {
  try {
    // Both create and update use PUT method
    const endpoint =
      id && id.trim() !== ""
        ? `/api/admin/shop-showcase/${id}`
        : `/api/admin/shop-showcase`;

    const res = await apiClient(endpoint, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("showcase");
    }

    return res;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : "Failed to save showcase",
      data: null,
    };
  }
}

export async function getShowcase() {
  try {
    const res = await apiClient(`/api/showcase/shop-showcase`, {
      method: "GET",
      tags: ["showcase"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get showcase list",
      data: null,
    };
  }
}

// reservation showcase api

export async function getReservationShowcase() {
  try {
    const res = await apiClient(`/api/admin/reservation-showcase`, {
      method: "GET",
      tags: ["reservationShowcase"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get reservation showcase list",
      data: null,
    };
  }
}

export async function updateReservationShowcase(id: string, data: FormData) {
  try {
    // Both create and update use PUT method
    const endpoint =
      id && id.trim() !== ""
        ? `/api/admin/reservation-showcase/${id}`
        : `/api/admin/reservation-showcase`;

    const res = await apiClient(endpoint, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("reservationShowcase");
    }

    return res;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to save reservation showcase",
      data: null,
    };
  }
}

export async function getAllReservationShowcase() {
  try {
    const res = await apiClient(`/api/showcase/reservation-showcase`, {
      method: "GET",
      // tags: ["gallery"],
      cache: "no-store",
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get all reservation",
      data: null,
    };
  }
}
