import { auth } from "@/app/api/auth/[...nextauth]/auth";

type FetchOptions<TBody> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  tags?: string[];
  cache?: "force-cache" | "no-store";
  isFormData?: boolean;
};

export async function apiClient<TResponse = any, TBody = undefined>(
  url: string,
  options: FetchOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, tags, cache, isFormData = false } = options;
  const session = await auth();

  const token = session?.token;

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Only add Content-Type for JSON, not for FormData
  if (!isFormData && body) {
    headers["Content-Type"] = "application/json";
  }
  const isMutation =
    method === "POST" ||
    method === "PUT" ||
    method === "PATCH" ||
    method === "DELETE";

  const res = await fetch(`${baseURL}${url}`, {
    method,
    headers,
    body: isFormData ? (body as any) : body ? JSON.stringify(body) : undefined,

    //  proper cache + tag handling
    ...(tags
      ? { next: { tags } }
      : { cache: isMutation ? "no-store" : cache || "force-cache" }),
  });

  if (!res.ok) {
    let errorMessage = `HTTP error! status: ${res.status}`;

    try {
      const errorData = await res.json();
      // Extract the actual message from the API response
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If parsing fails, try to get text
      const errorText = await res.text();
      errorMessage = errorText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  return res.json();
}
