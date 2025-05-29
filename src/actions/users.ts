"use server";

import { getAuthToken } from "@/lib/auth";
import { BaseUser } from "@/types/users.type";

export async function getUsers() {
  const token = await getAuthToken();
  const res = await fetch(`${process.env.BACKEND_URL}/users?role=user`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.statusText}`);
  }

  const data = await res.json();

  // Vérifier que data est un array
  if (!Array.isArray(data)) {
    console.error("Expected array but got:", typeof data, data);
    return [];
  }

  return data as BaseUser[];
}

export async function getAdministrators() {
  const token = await getAuthToken();
  const res = await fetch(`${process.env.BACKEND_URL}/users?role=admin`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch administrators: ${res.statusText}`);
  }

  const data = await res.json();

  // Vérifier que data est un array
  if (!Array.isArray(data)) {
    console.error("Expected array but got:", typeof data, data);
    return [];
  }

  return data as BaseUser[];
}

export async function getAdministrator(id: string) {
  const token = await getAuthToken();

  const res = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch administrator: ${res.statusText}`);
  }

  const data = await res.json();
  return data as BaseUser;
}

export async function getUsersProfile() {
  const token = await getAuthToken();
  const res = await fetch(`${process.env.BACKEND_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users profile: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function getUser(id: string) {
  const token = await getAuthToken();
  const res = await fetch(
    `${process.env.BACKEND_URL}/users/profile/user/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
