"use client";
import DataTable from "@/components/data-table/data-table";
import { User } from "@/types/users.type";
import { administratorsTableConfig } from "./administrators-table-config";

interface AdministratorsDataTableProps {
  administrators: User[];
  loading?: boolean;
}

const AdministratorsDataTable = ({
  administrators,
  loading = false,
}: AdministratorsDataTableProps) => {
  return (
    <DataTable
      data={administrators}
      config={administratorsTableConfig}
      loading={loading}
      emptyMessage="Aucun administrateur trouvé."
      noResultsMessage="Aucun administrateur ne correspond aux critères de recherche."
    />
  );
};

export default AdministratorsDataTable;
