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
import { useTableFilters } from "@/hooks/use-table-filters";
import { User } from "@/types/users.type";
import { Download, Filter, Search, X } from "lucide-react";

interface AdvancedDataTableProps {
  users: User[];
}

const AdvancedDataTable = ({ users }: AdvancedDataTableProps) => {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    clearFilters,
    filteredData: filteredUsers,
    hasActiveFilters,
  } = useTableFilters({
    data: users,
    searchFields: ["name", "email", "id"],
  });

  // Obtenir la liste unique des rôles pour le filtre
  const uniqueRoles = Array.from(
    new Set(users.map((user) => user.role))
  ).sort();

  const exportToCSV = () => {
    const headers = ["ID", "Nom", "Email", "Rôle"];
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map((user) =>
        [user.id, user.name, user.email, user.role]
          .map((field) => `"${field}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "utilisateurs.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Barre de recherche et actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilter("role", filters.role === "" ? uniqueRoles[0] || "" : "")
            }
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtrer par rôle
            {filters.role && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                1
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
          onClick={exportToCSV}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Filtre de rôle actif */}
      {filters.role && (
        <div className="rounded-lg border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filtres actifs</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter("role", "")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-secondary text-secondary-foreground">
              Rôle: {filters.role}
            </span>
          </div>
        </div>
      )}

      {/* Sélecteur de rôle */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Filtrer par rôle:</label>
        <select
          value={filters.role || ""}
          onChange={(e) => setFilter("role", e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="">Tous les rôles</option>
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Résultats */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredUsers.length} utilisateur
          {filteredUsers.length !== 1 ? "s" : ""} trouvé
          {filteredUsers.length !== 1 ? "s" : ""}
          {hasActiveFilters && ` sur ${users.length} au total`}
        </p>
      </div>

      {/* Tableau */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  {hasActiveFilters
                    ? "Aucun utilisateur ne correspond aux critères de recherche."
                    : "Aucun utilisateur trouvé."}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-sm">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                      {user.role}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdvancedDataTable;
