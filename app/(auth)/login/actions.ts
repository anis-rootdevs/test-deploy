"use server";

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || !data.status) {
    return { error: data.message || "Invalid credentials" };
  }

  const token = data.data.token;

  // ✅ Return success result
  return { success: true, token };
}
