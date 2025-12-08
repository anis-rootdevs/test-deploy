"use server";
import { apiClient } from "@/lib/api-client";
import { updateTag } from "next/cache";

// general settings
export async function getGeneralSettings() {
  try {
    const res = await apiClient(`/api/admin/settings/general`, {
      method: "GET",
      tags: ["generalSettings"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get general settings list",
      data: null,
    };
  }
}

export async function updateGeneralSettings(data: FormData) {
  try {
    // Both create and update use PUT method
    const endpoint = `/api/admin/settings/general`;

    const res = await apiClient(endpoint, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("generalSettings");
    }

    return res;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to save generalSettings",
      data: null,
    };
  }
}

// page banner api

export async function getPageBanner() {
  try {
    const res = await apiClient(`/api/admin/settings/page-banner`, {
      method: "GET",
      tags: ["bannerSettings"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get page banner list",
      data: null,
    };
  }
}

export async function updatePageBanner(data: FormData) {
  try {
    // Both create and update use PUT method
    const endpoint = `/api/admin/settings/page-banner`;

    const res = await apiClient(endpoint, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("bannerSettings");
    }

    return res;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : "Failed to save page banner",
      data: null,
    };
  }
}

// Cloudinary api

export async function getCloudinary() {
  try {
    const res = await apiClient(`/api/admin/settings/cloudinary`, {
      method: "GET",
      tags: ["cloudinarySettings"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get cloudinary list",
      data: null,
    };
  }
}

export async function updateCloudinary(data: any) {
  try {
    // Both create and update use PUT method
    const endpoint = `/api/admin/settings/cloudinary`;

    const res = await apiClient(endpoint, {
      method: "PUT",
      body: data,
      isFormData: false,
    });

    if (res?.status) {
      updateTag("cloudinarySettings");
    }

    return res;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to save cloudinarySettings",
      data: null,
    };
  }
}

// meta data settings api

export async function getMetadata() {
  try {
    const res = await apiClient(`/api/admin/settings/metadata`, {
      method: "GET",
      tags: ["metaDataSettings"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get metadata list",
      data: null,
    };
  }
}

export async function updateMetadata(data: FormData) {
  try {
    // Both create and update use PUT method
    const endpoint = `/api/admin/settings/metadata`;

    const res = await apiClient(endpoint, {
      method: "PUT",
      body: data,
      isFormData: true,
    });

    if (res?.status) {
      updateTag("metaDataSettings");
    }

    return res;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : "Failed to save metadata",
      data: null,
    };
  }
}

//Business hours settings api

export async function getBusinessHours() {
  try {
    const res = await apiClient(`/api/admin/settings/business-hour`, {
      method: "GET",
      tags: ["businessHours"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get businessHours list",
      data: null,
    };
  }
}

export async function updateBusinessHours(data: any) {
  try {
    // Both create and update use PUT method
    const endpoint = `/api/admin/settings/business-hour`;

    const res = await apiClient(endpoint, {
      method: "PUT",
      body: data,
      isFormData: false,
    });

    if (res?.status) {
      updateTag("businessHours");
    }

    return res;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : "Failed to save businessHours",
      data: null,
    };
  }
}

//Terms & Policy settings api

export async function getTermsPolicy() {
  try {
    const res = await apiClient(`/api/admin/settings/terms`, {
      method: "GET",
      tags: ["terms"],
    });

    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to get terms list",
      data: null,
    };
  }
}

export async function updateTermsPolicy(data: any) {
  try {
    // Both create and update use PUT method
    const endpoint = `/api/admin/settings/terms`;

    const res = await apiClient(endpoint, {
      method: "PUT",
      body: data,
      isFormData: false,
    });

    if (res?.status) {
      updateTag("terms");
    }

    return res;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error ? error.message : "Failed to save TermsPolicy",
      data: null,
    };
  }
}

export async function getAllSettingsDetails(context: string) {
  try {
    const res = await apiClient(`/api/settings?context=${context}`, {
      method: "GET",
      tags: ["settings"],
      revalidate: 300,
      // cache: "force-cache",
    });
    return res;
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get general setting data",
      data: null,
    };
  }
}
