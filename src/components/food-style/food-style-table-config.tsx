"use client";
import { FoodStyle } from "@/types/food-style.type";
import { TableConfig } from "@/types/table.types";

export const foodStyleTableConfig: TableConfig<FoodStyle> = {
  columns: [
    {
      key: "id",
      label: "ID",
      className: "font-mono text-sm w-24",
    },
    {
      key: "name",
      label: "Nom du style de cuisine",
      className: "font-medium",
      render: (value) => (
        <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800">
          {String(value)}
        </span>
      ),
    },
  ],
  searchFields: ["name", "id"],
  filters: [], // Pas de filtres spécifiques pour ce type simple
  exportable: true,
  exportFilename: "styles-de-cuisine.csv",
};
