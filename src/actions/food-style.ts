"use server";

import { getAuthToken } from "@/lib/auth";

export async function getFoodStyles() {
  const token = await getAuthToken();
  const res = await fetch(`${process.env.BACKEND_URL}/food-style`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}
