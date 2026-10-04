import type { TableQueryParams } from "@/components/common/data-table/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRolesService } from "./role.service";

export const rolesKeys = {
  all: ["roles"] as const,
  list: (params: TableQueryParams) =>
    [...rolesKeys.all, "list", params] as const,
};

export function useRolesQuery(params: TableQueryParams) {
  return useQuery({
    queryKey: rolesKeys.list(params),
    queryFn: ({ signal }) => getRolesService(params, signal),

    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,

    placeholderData: keepPreviousData,
  });
}
