import { getFoodStyles } from "@/actions/food-style";
import DataTable from "@/components/food-style/data-table";
import DataTableSkeleton from "@/components/food-style/data-table-skeleton";
import { Suspense } from "react";

export default async function AdministratorsPage() {
  const foodStyles = await getFoodStyles();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Style de cuisine</h1>
        <p className="text-muted-foreground">
          Gérez et consultez la liste des styles de cuisine de votre
          application.
        </p>
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        {foodStyles.length > 0 ? (
          <DataTable foodStyles={foodStyles} />
        ) : (
          <div className="text-center text-muted-foreground">
            Aucun style de cuisine trouvé.
          </div>
        )}
      </Suspense>
    </div>
  );
}
