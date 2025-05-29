"use server";

import { getAuthToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

export async function getFoodStyle(id: string) {
  const token = await getAuthToken();
  const res = await fetch(`${process.env.BACKEND_URL}/food-style/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch food style: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function createFoodStyle(formData: FormData) {
  const token = await getAuthToken();
  const name = formData.get("name") as string;

  if (!name || name.trim() === "") {
    throw new Error("Le nom du style de cuisine est requis");
  }

  const res = await fetch(`${process.env.BACKEND_URL}/food-style`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: name.trim() }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.message || "Erreur lors de la création du style de cuisine"
    );
  }

  const data = await res.json();
  revalidatePath("/dashboard/food-style");
  return data;
}

export async function updateFoodStyle(id: string, formData: FormData) {
  const token = await getAuthToken();
  const name = formData.get("name") as string;

  if (!name || name.trim() === "") {
    throw new Error("Le nom du style de cuisine est requis");
  }

  const res = await fetch(`${process.env.BACKEND_URL}/food-style/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: name.trim() }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.message || "Erreur lors de la mise à jour du style de cuisine"
    );
  }

  const data = await res.json();
  revalidatePath("/dashboard/food-style");
  return data;
}

export async function deleteFoodStyle(id: string) {
  const token = await getAuthToken();

  const res = await fetch(`${process.env.BACKEND_URL}/food-style/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.message || "Erreur lors de la suppression du style de cuisine"
    );
  }

  revalidatePath("/dashboard/food-style");
  return { success: true };
}
