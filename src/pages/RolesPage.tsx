import { SearchInput } from "@/components/common/SearchInput";
import {
  DataTable,
  useServerDataTable,
  useTableQueryState,
} from "@/components/common/data-table";
import type { Role } from "@/features/roles/role.service";
import { rolesColumns } from "@/features/roles/rolesColumns";
import { useRolesQuery } from "@/features/roles/useRolesQuery";

const EMPTY: Role[] = [];

export function RolesPage() {
  // 1. estado: página, orden y búsqueda (ya convertido a params del backend)
  const tableQuery = useTableQueryState();

  // 2. datos: GET /roles?page=..&size=..&sort=..&search=..
  const { data, isLoading } = useRolesQuery(tableQuery.params);

  // 3. tabla: solo muestra lo que devuelve el servidor
  const table = useServerDataTable({
    columns: rolesColumns,
    data: data?.content ?? EMPTY,
    rowCount: data?.page.totalElements ?? 0,
    tableQuery,
  });
  
  return (
    <section className="mx-auto w-full space-y-3.5 p-2 lg:p-3">
      {/* Cabecera */}
      <div className="flex flex-col items-start justify-between">
        <h2 className="text-xl font-bold">Roles</h2>
        <p className="text-sm text-muted-foreground">
          Aquí puedes ver y administrar los roles del sistema.
        </p>
      </div>

      {/* Buscador - Debounced */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <SearchInput
          placeholder="Buscar roles..."
          onChange={tableQuery.setSearch}
        />
      </div>

      <DataTable table={table} isLoading={isLoading} />
    </section>
  );
}

export default RolesPage;
