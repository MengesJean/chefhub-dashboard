import { getFoodStyles } from "@/actions/food-style";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import FoodStyleDataTable from "@/components/food-style/food-style-data-table";
import { Suspense } from "react";

export default async function FoodStylePage() {
  const foodStyles = await getFoodStyles();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Styles de cuisine</h1>
        <p className="text-muted-foreground">
          Gérez et consultez la liste des styles de cuisine de votre
          application.
        </p>
      </div>
      <Suspense fallback={<DataTableSkeleton columns={3} rows={5} />}>
        <FoodStyleDataTable foodStyles={foodStyles} />
      </Suspense>
    </div>
  );
}
