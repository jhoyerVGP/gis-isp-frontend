import { createColumnHelper } from "@tanstack/react-table";

import {
  DataTableColumnHeader,
  type DataTableFeatures,
} from "@/components/common/data-table";
import type { Role } from "./role.service";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, ShieldCheck, Trash2 } from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Role>();

export const rolesColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    enableGlobalFilter: true,
    enableSorting: true,
  }),
  columnHelper.accessor("description", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
    ),
    enableGlobalFilter: true,
    enableSorting: true,
  }),
  columnHelper.accessor("usersCount", {
    header: () => <div className="text-center">Usuarios</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.usersCount}</div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("permissionsCount", {
    header: () => <div className="text-center">Permisos</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.permissionsCount}</div>
    ),
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-center">Acciones</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Permisos
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableSorting: false,
  }),
]);
