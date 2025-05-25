"use client";

import { logoutUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <form action={handleLogout}>
        <Button type="submit" variant="destructive">
          Se déconnecter
        </Button>
      </form>
    </div>
  );
}
