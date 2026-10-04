import { useState } from "react";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import type { TableQueryParams } from "./types";

/**
 * Estado de la tabla en modo servidor: página, orden y búsqueda.
 * Vive fuera de la tabla para poder usarlo en el queryKey.
 * `params` ya viene listo para tu backend.
 */
export function useTableQueryState(initialPageSize = 10) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearchValue] = useState("");

  // En modo manual TanStack no reinicia la página solo: lo hacemos aquí
  const goToFirstPage = () => setPagination((p) => ({ ...p, pageIndex: 0 }));

  const onSortingChange: typeof setSorting = (updater) => {
    setSorting(updater);
    goToFirstPage();
  };

  const setSearch = (value: string) => {
    setSearchValue(value);
    goToFirstPage();
  };

  const sort = sorting[0];
  const params: TableQueryParams = {
    page: pagination.pageIndex,
    size: pagination.pageSize,
    sort: sort ? `${sort.id},${sort.desc ? "desc" : "asc"}` : undefined,
    search: search || undefined,
  };

  return {
    params,
    pagination,
    sorting,
    setSearch,
    onPaginationChange: setPagination,
    onSortingChange,
  };
}

export type TableQueryState = ReturnType<typeof useTableQueryState>;
