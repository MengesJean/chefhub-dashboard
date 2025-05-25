// lib/auth.ts
"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "access_token";

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
}

export async function clearAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
}
