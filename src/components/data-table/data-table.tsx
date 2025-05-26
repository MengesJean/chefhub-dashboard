"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGenericTableFilters } from "@/hooks/use-generic-table-filters";
import { DataTableProps, TableFilter } from "@/types/table.types";
import { Download, Filter, Search, X } from "lucide-react";
import { useState } from "react";

function DataTable<T extends Record<string, unknown>>({
  data,
  config,
  loading = false,
  emptyMessage = "Aucune donnée trouvée.",
  noResultsMessage = "Aucun résultat ne correspond aux critères de recherche.",
}: DataTableProps<T>) {
  const {
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
  } = useGenericTableFilters({
    data,
    searchFields: config.searchFields,
    filters: config.filters,
  });

  const [showFilters, setShowFilters] = useState(false);

  const renderFilterInput = (filter: TableFilter<T>) => {
    const fieldKey = String(filter.field);
    const value = activeFilters[fieldKey] || "";

    switch (filter.type) {
      case "select":
        const options = filter.options || getUniqueValues(filter.field);
        return (
          <select
            value={value}
            onChange={(e) => setFilter(fieldKey, e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">
              {filter.placeholder || `Tous les ${filter.label.toLowerCase()}`}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "text":
        return (
          <Input
            type="text"
            placeholder={
              filter.placeholder || `Filtrer par ${filter.label.toLowerCase()}`
            }
            value={value}
            onChange={(e) => setFilter(fieldKey, e.target.value)}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={
              filter.placeholder || `Filtrer par ${filter.label.toLowerCase()}`
            }
            value={value}
            onChange={(e) => setFilter(fieldKey, e.target.value)}
          />
        );

      case "date":
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => setFilter(fieldKey, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  const activeFilterCount =
    Object.values(activeFilters).filter((v) => v !== "").length +
    (searchTerm ? 1 : 0);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Barre de recherche et actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          {config.filters && config.filters.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtres
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          )}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Effacer
            </Button>
          )}
        </div>

        {config.exportable && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(config.exportFilename)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exporter CSV
          </Button>
        )}
      </div>

      {/* Filtres avancés */}
      {showFilters && config.filters && config.filters.length > 0 && (
        <div className="rounded-lg border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filtres avancés</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {config.filters.map((filter) => (
              <div key={String(filter.field)} className="space-y-2">
                <label className="text-sm font-medium">{filter.label}</label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtres actifs */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-secondary text-secondary-foreground">
              Recherche: &ldquo;{searchTerm}&rdquo;
              <button
                onClick={() => setSearchTerm("")}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value) return null;
            const filter = config.filters?.find((f) => String(f.field) === key);
            return (
              <span
                key={key}
                className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-secondary text-secondary-foreground"
              >
                {filter?.label || key}: {value}
                <button
                  onClick={() => clearFilter(key)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Résultats */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredData.length} résultat{filteredData.length !== 1 ? "s" : ""}{" "}
          trouvé{filteredData.length !== 1 ? "s" : ""}
          {hasActiveFilters && ` sur ${data.length} au total`}
        </p>
      </div>

      {/* Tableau */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {config.columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={column.className}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={config.columns.length}
                  className="h-24 text-center"
                >
                  {hasActiveFilters ? noResultsMessage : emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, index) => (
                <TableRow key={index}>
                  {config.columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={column.className}
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key] || "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
