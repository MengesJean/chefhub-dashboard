"use client";
import { TableConfig } from "@/types/table.types";
import { User } from "@/types/users.type";

export const usersTableConfig: TableConfig<User> = {
  columns: [
    {
      key: "id",
      label: "ID",
      className: "font-mono text-sm",
    },
    {
      key: "name",
      label: "Nom",
      className: "font-medium",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Rôle",
      render: (value) => (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
          {String(value)}
        </span>
      ),
    },
  ],
  searchFields: ["name", "email", "id"],
  filters: [
    {
      field: "role",
      type: "select",
      label: "Rôle",
      placeholder: "Tous les rôles",
    },
  ],
  exportable: true,
  exportFilename: "utilisateurs.csv",
};
