"use server";

import { apiClient } from "@/lib/api-client";

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const res = await apiClient(`/api/admin/auth/login`, {
    method: "POST",
    body: { email, password },
    cache: "no-store",
  });

  if (!res?.status) {
    return {
      error: res?.message || "Invalid credentials",
    };
  }

  const token = res?.data?.token;

  // ✅ Return success result
  return { success: true, token };
}
