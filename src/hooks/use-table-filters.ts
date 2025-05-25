import { useMemo, useState } from "react";

interface UseTableFiltersProps<T> {
  data: T[];
  searchFields: (keyof T)[];
}

export function useTableFilters<T>({
  data,
  searchFields,
}: UseTableFiltersProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

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
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (value === "") return true;
        const itemValue = item[key as keyof T];
        return itemValue === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filters, searchFields]);

  const setFilter = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({});
  };

  const hasActiveFilters =
    searchTerm !== "" || Object.values(filters).some((v) => v !== "");

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    clearFilters,
    filteredData,
    hasActiveFilters,
  };
}
