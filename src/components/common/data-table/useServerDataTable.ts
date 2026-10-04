import { useTable, type RowData } from "@tanstack/react-table";

import { dataTableFeatures } from "./data-table-features";
import type { DataTableColumns } from "./use-data-table";
import type { TableQueryState } from "./useTableQueryState";

interface UseServerDataTableOptions<TData extends RowData> {
  columns: DataTableColumns<TData>;
  /** Solo las filas de la página actual (`content`). */
  data: TData[];
  /** Total de registros del backend (`page.totalElements`). */
  rowCount: number;
  tableQuery: TableQueryState;
}

export function useServerDataTable<TData extends RowData>({
  columns,
  data,
  rowCount,
  tableQuery,
}: UseServerDataTableOptions<TData>) {
  return useTable({
    features: dataTableFeatures,
    columns,
    data,
    rowCount,
    // El backend ya pagina, ordena y filtra: la tabla solo muestra
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    // Tu API acepta un solo `sort`
    enableMultiSort: false,
    state: {
      pagination: tableQuery.pagination,
      sorting: tableQuery.sorting,
    },
    onPaginationChange: tableQuery.onPaginationChange,
    onSortingChange: tableQuery.onSortingChange,
  });
}
