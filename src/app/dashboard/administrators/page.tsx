import { getAdministrators } from "@/actions/users";
import DataTable from "@/components/data-table";
import DataTableSkeleton from "@/components/data-table-skeleton";
import { Suspense } from "react";

export default async function AdministratorsPage() {
  const users = await getAdministrators();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez et consultez la liste des utilisateurs de votre application.
        </p>
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <DataTable users={users} />
      </Suspense>
    </div>
  );
}
