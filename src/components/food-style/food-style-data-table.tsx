"use client";
import DataTable from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { FoodStyle } from "@/types/food-style.type";
import { Plus } from "lucide-react";
import { useState } from "react";
import FoodStyleDeleteModal from "./food-style-delete-modal";
import FoodStyleFormModal from "./food-style-form-modal";
import { createFoodStyleTableConfig } from "./food-style-table-config";

interface FoodStyleDataTableProps {
  foodStyles: FoodStyle[];
  loading?: boolean;
}

const FoodStyleDataTable = ({
  foodStyles,
  loading = false,
}: FoodStyleDataTableProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFoodStyle, setSelectedFoodStyle] = useState<FoodStyle | null>(
    null
  );

  const handleEdit = (foodStyle: FoodStyle) => {
    setSelectedFoodStyle(foodStyle);
    setIsEditModalOpen(true);
  };

  const handleDelete = (foodStyle: FoodStyle) => {
    setSelectedFoodStyle(foodStyle);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedFoodStyle(null);
  };

  const tableConfig = createFoodStyleTableConfig({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="space-y-4">
      {/* Header avec bouton d'ajout */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            Gestion des styles de cuisine
          </h2>
          <p className="text-sm text-muted-foreground">
            Créez, modifiez et supprimez les styles de cuisine.
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un style
        </Button>
      </div>

      {/* Tableau */}
      <DataTable
        data={foodStyles}
        config={tableConfig}
        loading={loading}
        emptyMessage="Aucun style de cuisine trouvé."
        noResultsMessage="Aucun style de cuisine ne correspond aux critères de recherche."
      />

      {/* Modales */}
      <FoodStyleFormModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModals}
        mode="create"
      />

      <FoodStyleFormModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        foodStyle={selectedFoodStyle}
        mode="edit"
      />

      <FoodStyleDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        foodStyle={selectedFoodStyle}
      />
    </div>
  );
};

export default FoodStyleDataTable;
