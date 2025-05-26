import DataTable from "@/components/data-table/data-table";
import { User } from "@/types/users.type";
import { usersTableConfig } from "./users-table-config";

interface UsersDataTableProps {
  users: User[];
  loading?: boolean;
}

const UsersDataTable = ({ users, loading = false }: UsersDataTableProps) => {
  return (
    <DataTable
      data={users}
      config={usersTableConfig}
      loading={loading}
      emptyMessage="Aucun utilisateur trouvé."
      noResultsMessage="Aucun utilisateur ne correspond aux critères de recherche."
    />
  );
};

export default UsersDataTable;
