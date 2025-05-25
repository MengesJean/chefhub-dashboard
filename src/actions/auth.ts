"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginInput = z.infer<typeof loginSchema>;

export async function loginUser(formData: LoginInput) {
  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    return { error: "Validation failed", details: parsed.error.flatten() };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      return { error: "Invalid credentials" };
    }

    const data = await res.json();
    const token = data.access_token;

    if (!token) {
      return { error: "Missing token in response" };
    }

    // ✅ Écriture directe du cookie dans la Server Action
    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 jour
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  redirect("/login");
}
