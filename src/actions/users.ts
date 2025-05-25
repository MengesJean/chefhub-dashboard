"use server";

import { getAuthToken } from "@/lib/auth";

export async function getUsers() {
  const token = await getAuthToken();
  const res = await fetch(`${process.env.BACKEND_URL}/users`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
}
