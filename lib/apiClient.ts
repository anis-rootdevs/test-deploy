import { auth } from "@/app/api/auth/[...nextauth]/auth";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  tags?: string[];
  cache?: "force-cache" | "no-store";
};

export async function apiClient(url: string, options: FetchOptions = {}) {
  const { method = "GET", body, tags, cache } = options;
  const session = await auth();

  const token = session?.token;

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseURL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: cache || "force-cache",
    ...(tags ? { next: { tags } } : {}),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error ${res.status}: ${error}`);
  }

  return res.json();
}
