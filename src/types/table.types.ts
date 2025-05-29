export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
  className?: string;
}

export interface TableFilter<T> {
  field: keyof T;
  type: "select" | "text" | "date" | "number";
  label: string;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  searchFields: (keyof T)[];
  filters?: TableFilter<T>[];
  exportable?: boolean;
  exportFilename?: string;
}

export interface DataTableProps<T> {
  data: T[];
  config: TableConfig<T>;
  loading?: boolean;
  emptyMessage?: string;
  noResultsMessage?: string;
}
