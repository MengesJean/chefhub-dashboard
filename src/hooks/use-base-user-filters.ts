import { BaseUser } from "@/types/users.type";
import { useMemo, useState } from "react";

interface UseBaseUserFiltersProps {
  data: BaseUser[];
}

export function useBaseUserFilters({ data }: UseBaseUserFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );

  const filteredData = useMemo(() => {
    return data.filter((user) => {
      // Recherche textuelle dans firstName, lastName, email et ID
      const matchesSearch =
        searchTerm === "" ||
        [user.firstName, user.lastName, user.email, user.id?.toString()]
          .filter(Boolean)
          .some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
          );

      // Filtres spécifiques
      const matchesFilters = Object.entries(activeFilters).every(
        ([key, value]) => {
          if (value === "") return true;

          switch (key) {
            case "role":
              return user.role === value;
            case "provider":
              return user.provider === value;
            default:
              return true;
          }
        }
      );

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, activeFilters]);

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

  const getUniqueRoles = (): Array<{ value: string; label: string }> => {
    const roles = Array.from(
      new Set(data.map((item) => item.role).filter(Boolean))
    );
    return roles
      .map((role) => ({ value: role!, label: role! }))
      .sort((a, b) => a.label.localeCompare(b.label));
  };

  const exportToCSV = (filename: string = "export.csv") => {
    if (filteredData.length === 0) return;

    const headers = [
      "ID",
      "Prénom",
      "Nom",
      "Email",
      "Rôle",
      "Fournisseur",
      "Date de création",
      "Dernière mise à jour",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredData.map((user) =>
        [
          user.id,
          user.firstName || "",
          user.lastName || "",
          user.email || "",
          user.role || "",
          user.provider || "",
          user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("fr-FR")
            : "",
          user.updatedAt
            ? new Date(user.updatedAt).toLocaleDateString("fr-FR")
            : "",
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
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
    getUniqueRoles,
    exportToCSV,
  };
}
