"use client";
import { Button } from "@/components/ui/button";
import { FoodStyle } from "@/types/food-style.type";
import { TableConfig } from "@/types/table.types";
import { Edit, Trash2 } from "lucide-react";

interface FoodStyleTableConfigProps {
  onEdit: (foodStyle: FoodStyle) => void;
  onDelete: (foodStyle: FoodStyle) => void;
}

export const createFoodStyleTableConfig = ({
  onEdit,
  onDelete,
}: FoodStyleTableConfigProps): TableConfig<FoodStyle> => ({
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
    {
      key: "actions",
      label: "Actions",
      className: "w-32",
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Modifier</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(item)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Supprimer</span>
          </Button>
        </div>
      ),
    },
  ],
  searchFields: ["name", "id"],
  filters: [], // Pas de filtres spécifiques pour ce type simple
  exportable: true,
  exportFilename: "styles-de-cuisine.csv",
});
