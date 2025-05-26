import { getUsers } from "@/actions/users";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import UsersDataTable from "@/components/users/users-data-table";
import { Suspense } from "react";

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez et consultez la liste des utilisateurs de votre application.
        </p>
      </div>
      <Suspense fallback={<DataTableSkeleton columns={4} rows={5} />}>
        <UsersDataTable users={users} />
      </Suspense>
    </div>
  );
}
