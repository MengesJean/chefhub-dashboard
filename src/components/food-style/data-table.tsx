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
import { FoodStyle } from "@/types/food-style.type";
import { Filter, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

interface DataTableProps {
  foodStyles: FoodStyle[];
}

const DataTable = ({ foodStyles }: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filtrer les utilisateurs basé sur la recherche et les filtres
  const filteredFoodStyles = useMemo(() => {
    return foodStyles.filter((foodStyle) => {
      const matchesSearch =
        searchTerm === "" ||
        foodStyle.name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [foodStyles, searchTerm]);

  const clearFilters = () => {
    setSearchTerm("");
  };

  const hasActiveFilters = searchTerm !== "";

  return (
    <div className="space-y-4">
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom..."
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
            {hasActiveFilters && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {searchTerm ? 1 : 0}
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
      </div>

      {/* Résultats */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredFoodStyles.length} style de cuisine
          {filteredFoodStyles.length !== 1 ? "s" : ""} trouvé
          {filteredFoodStyles.length !== 1 ? "s" : ""}
          {hasActiveFilters && ` sur ${foodStyles.length} au total`}
        </p>
      </div>

      {/* Tableau */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFoodStyles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  {hasActiveFilters
                    ? "Aucun utilisateur ne correspond aux critères de recherche."
                    : "Aucun utilisateur trouvé."}
                </TableCell>
              </TableRow>
            ) : (
              filteredFoodStyles.map((foodStyle) => (
                <TableRow key={foodStyle.id}>
                  <TableCell className="font-mono text-sm">
                    {foodStyle.id}
                  </TableCell>
                  <TableCell>{foodStyle.name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
