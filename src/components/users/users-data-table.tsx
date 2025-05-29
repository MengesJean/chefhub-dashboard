import { BaseUser } from "@/types/users.type";
import BaseUserDataTable from "../shared/base-user-data-table";

interface UsersDataTableProps {
  users: BaseUser[];
  loading?: boolean;
}

const UsersDataTable = ({ users, loading = false }: UsersDataTableProps) => {
  return (
    <BaseUserDataTable
      users={users}
      loading={loading}
      emptyMessage="Aucun utilisateur trouvé."
      noResultsMessage="Aucun utilisateur ne correspond aux critères de recherche."
      exportFilename="utilisateurs.csv"
      userType="user"
    />
  );
};

export default UsersDataTable;
