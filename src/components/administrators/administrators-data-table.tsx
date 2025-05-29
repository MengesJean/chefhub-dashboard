"use client";
import { BaseUser } from "@/types/users.type";
import BaseUserDataTable from "../shared/base-user-data-table";

interface AdministratorsDataTableProps {
  administrators: BaseUser[];
  loading?: boolean;
}

const AdministratorsDataTable = ({
  administrators,
  loading = false,
}: AdministratorsDataTableProps) => {
  return (
    <BaseUserDataTable
      users={administrators}
      loading={loading}
      emptyMessage="Aucun administrateur trouvé."
      noResultsMessage="Aucun administrateur ne correspond aux critères de recherche."
      exportFilename="administrateurs.csv"
      userType="admin"
    />
  );
};

export default AdministratorsDataTable;
