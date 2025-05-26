import { getAdministrators } from "@/actions/users";
import AdministratorsDataTable from "@/components/administrators/administrators-data-table";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import { Suspense } from "react";

export default async function AdministratorsPage() {
  const administrators = await getAdministrators();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Administrateurs</h1>
        <p className="text-muted-foreground">
          Gérez et consultez la liste des administrateurs de votre application.
        </p>
      </div>
      <Suspense fallback={<DataTableSkeleton columns={4} rows={5} />}>
        <AdministratorsDataTable administrators={administrators} />
      </Suspense>
    </div>
  );
}
