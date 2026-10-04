import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";

import {
  dataTableFeatures,
  type DataTableFeatures,
} from "./data-table-features";

export type DataTableColumns<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData
>[];

interface UseDataTableOptions<TData extends RowData> {
  columns: DataTableColumns<TData>;
  data: TData[];
  pageSize?: number;
}

// Hook personalizado para crear una tabla de datos con características predefinidas
export function useDataTable<TData extends RowData>({
  columns,
  data,
  pageSize = 10,
}: UseDataTableOptions<TData>) {
  return useTable({
    features: dataTableFeatures,
    columns,
    data,
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize } },
  });
}
