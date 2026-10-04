import { axiosClient } from "@/api/axiosClient";
import type {
  PageResponse,
  TableQueryParams,
} from "@/components/common/data-table/types";

export interface Role {
  id: number;
  name: string;
  description: string;
  usersCount: number;
  permissionsCount: number;
}

// GET /roles?page=0&size=10&sort=name,asc&search=tec
// axios omite los params con valor undefined (sort y search vacíos)
export const getRolesService = async (
  params: TableQueryParams,
  signal?: AbortSignal,
): Promise<PageResponse<Role>> => {
  const { data } = await axiosClient.get<PageResponse<Role>>("/roles", {
    params,
    signal,
  });
  return data;
};
