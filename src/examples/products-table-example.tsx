// Exemple d'utilisation du système de tableau générique avec des produits

import { DataTable } from "@/components/data-table";
import { TableConfig } from "@/types/table.types";

// Type exemple pour des produits
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "discontinued";
  createdAt: string;
}

// Configuration du tableau pour les produits
const productsTableConfig: TableConfig<Product> = {
  columns: [
    {
      key: "id",
      label: "ID",
      className: "font-mono text-sm w-20",
    },
    {
      key: "name",
      label: "Nom du produit",
      className: "font-medium",
    },
    {
      key: "category",
      label: "Catégorie",
    },
    {
      key: "price",
      label: "Prix",
      render: (value) => `${Number(value).toFixed(2)} €`,
      className: "text-right",
    },
    {
      key: "stock",
      label: "Stock",
      render: (value) => (
        <span
          className={`font-medium ${
            Number(value) < 10 ? "text-red-600" : "text-green-600"
          }`}
        >
          {String(value)}
        </span>
      ),
      className: "text-center",
    },
    {
      key: "status",
      label: "Statut",
      render: (value) => {
        const statusColors = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-yellow-100 text-yellow-800",
          discontinued: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              statusColors[value as keyof typeof statusColors]
            }`}
          >
            {String(value)}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Date de création",
      render: (value) => new Date(String(value)).toLocaleDateString("fr-FR"),
    },
  ],
  searchFields: ["name", "category", "id"],
  filters: [
    {
      field: "category",
      type: "select",
      label: "Catégorie",
      placeholder: "Toutes les catégories",
    },
    {
      field: "status",
      type: "select",
      label: "Statut",
      options: [
        { value: "active", label: "Actif" },
        { value: "inactive", label: "Inactif" },
        { value: "discontinued", label: "Discontinué" },
      ],
    },
    {
      field: "price",
      type: "number",
      label: "Prix minimum",
      placeholder: "Prix minimum en €",
    },
  ],
  exportable: true,
  exportFilename: "produits.csv",
};

// Composant exemple
interface ProductsTableProps {
  products: Product[];
  loading?: boolean;
}

const ProductsTable = ({ products, loading = false }: ProductsTableProps) => {
  return (
    <DataTable
      data={products}
      config={productsTableConfig}
      loading={loading}
      emptyMessage="Aucun produit trouvé."
      noResultsMessage="Aucun produit ne correspond aux critères de recherche."
    />
  );
};

export default ProductsTable;
