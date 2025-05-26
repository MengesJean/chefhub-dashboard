"use client";
import DataTable from "@/components/data-table/data-table";
import { FoodStyle } from "@/types/food-style.type";
import { foodStyleTableConfig } from "./food-style-table-config";

interface FoodStyleDataTableProps {
  foodStyles: FoodStyle[];
  loading?: boolean;
}

const FoodStyleDataTable = ({
  foodStyles,
  loading = false,
}: FoodStyleDataTableProps) => {
  return (
    <DataTable
      data={foodStyles}
      config={foodStyleTableConfig}
      loading={loading}
      emptyMessage="Aucun style de cuisine trouvé."
      noResultsMessage="Aucun style de cuisine ne correspond aux critères de recherche."
    />
  );
};

export default FoodStyleDataTable;
