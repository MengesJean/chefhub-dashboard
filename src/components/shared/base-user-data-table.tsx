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
import { useBaseUserFilters } from "@/hooks/use-base-user-filters";
import { BaseUser } from "@/types/users.type";
import { Download, Eye, Filter, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface BaseUserDataTableProps {
  users: BaseUser[];
  loading?: boolean;
  emptyMessage?: string;
  noResultsMessage?: string;
  exportFilename?: string;
  userType: "user" | "admin";
}

export default function BaseUserDataTable({
  users,
  loading = false,
  emptyMessage = "Aucun utilisateur trouvé.",
  noResultsMessage = "Aucun utilisateur ne correspond aux critères de recherche.",
  exportFilename = "export.csv",
  userType,
}: BaseUserDataTableProps) {
  const {
    searchTerm,
    setSearchTerm,
    activeFilters,
    clearFilters,
    clearFilter,
    filteredData,
    hasActiveFilters,
    exportToCSV,
  } = useBaseUserFilters({ data: users });

  const [showFilters, setShowFilters] = useState(false);

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
              placeholder="Rechercher par nom, prénom, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

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

        <Button
          variant="outline"
          size="sm"
          onClick={() => exportToCSV(exportFilename)}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Filtres avancés */}
      {showFilters && (
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
            return (
              <span
                key={key}
                className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-secondary text-secondary-foreground"
              >
                {key === "role" ? "Rôle" : key}: {value}
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
          {hasActiveFilters && ` sur ${users.length} au total`}
        </p>
      </div>

      {/* Tableau */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono text-sm">ID</TableHead>
              <TableHead className="font-medium">Prénom</TableHead>
              <TableHead className="font-medium">Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {hasActiveFilters ? noResultsMessage : emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-sm">{user.id}</TableCell>
                  <TableCell className="font-medium">
                    {user.firstName || "Non renseigné"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.lastName || "Non renseigné"}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Link
                      href={
                        userType === "admin"
                          ? `/dashboard/administrators/${user.id}`
                          : `/dashboard/users/${user.id}`
                      }
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Voir le profil
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
