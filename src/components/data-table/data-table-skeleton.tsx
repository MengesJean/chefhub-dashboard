"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  columns?: number;
  rows?: number;
  showSearch?: boolean;
  showFilters?: boolean;
}

const DataTableSkeleton = ({
  columns = 4,
  rows = 5,
  showSearch = true,
  showFilters = true,
}: DataTableSkeletonProps) => {
  return (
    <div className="space-y-4">
      {/* Barre de recherche skeleton */}
      {showSearch && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Skeleton className="h-10 w-full max-w-sm" />
            {showFilters && <Skeleton className="h-10 w-20" />}
          </div>
        </div>
      )}

      {/* Compteur de résultats skeleton */}
      <Skeleton className="h-4 w-32" />

      {/* Tableau skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton
                      className={`h-4 ${
                        colIndex === 0
                          ? "w-24"
                          : colIndex === 1
                          ? "w-32"
                          : colIndex === 2
                          ? "w-40"
                          : "w-16"
                      }`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTableSkeleton;
