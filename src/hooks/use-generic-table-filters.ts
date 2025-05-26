import { TableFilter } from "@/types/table.types";
import { useMemo, useState } from "react";

interface UseGenericTableFiltersProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  filters?: TableFilter<T>[];
}

export function useGenericTableFilters<T>({
  data,
  searchFields,
  filters = [],
}: UseGenericTableFiltersProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Recherche textuelle
      const matchesSearch =
        searchTerm === "" ||
        searchFields.some((field) => {
          const value = item[field];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

      // Filtres spécifiques
      const matchesFilters = Object.entries(activeFilters).every(
        ([key, value]) => {
          if (value === "") return true;
          const itemValue = item[key as keyof T];

          // Gestion des différents types de filtres
          const filter = filters.find((f) => String(f.field) === key);
          if (!filter) return true;

          switch (filter.type) {
            case "select":
              return itemValue === value;
            case "text":
              return (
                typeof itemValue === "string" &&
                itemValue.toLowerCase().includes(value.toLowerCase())
              );
            case "number":
              return Number(itemValue) === Number(value);
            case "date":
              // Comparaison de dates simplifiée
              return String(itemValue).includes(value);
            default:
              return itemValue === value;
          }
        }
      );

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, activeFilters, searchFields, filters]);

  const setFilter = (field: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilters({});
  };

  const clearFilter = (field: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[field];
      return newFilters;
    });
  };

  const hasActiveFilters =
    searchTerm !== "" || Object.values(activeFilters).some((v) => v !== "");

  const getUniqueValues = (
    field: keyof T
  ): Array<{ value: string; label: string }> => {
    const values = Array.from(new Set(data.map((item) => String(item[field]))));
    return values
      .map((value) => ({ value, label: value }))
      .sort((a, b) => a.label.localeCompare(b.label));
  };

  const exportToCSV = (filename: string = "export.csv") => {
    if (filteredData.length === 0) return;

    // Obtenir les clés du premier élément pour les en-têtes
    const headers = Object.keys(filteredData[0] as object);

    const csvContent = [
      headers.join(","),
      ...filteredData.map((item) =>
        headers
          .map((header) => {
            const value = (item as Record<string, unknown>)[header];
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    searchTerm,
    setSearchTerm,
    activeFilters,
    setFilter,
    clearFilters,
    clearFilter,
    filteredData,
    hasActiveFilters,
    getUniqueValues,
    exportToCSV,
  };
}
