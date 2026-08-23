"use client";

import React, { useMemo } from "react";
import { 
  Button, 
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DataTable
} from "@commercex/ui";
import { MoreVerticalIcon, PlusIcon } from "lucide-react";
import { IMasterEntity } from "@commercex/types/src/masters.types";
import { ColumnDef } from "@tanstack/react-table";

interface MasterDataTableProps {
  title: string;
  description: string;
  data: IMasterEntity[];
  columns: { key: string; label: string; render?: (item: any) => React.ReactNode }[];
  onAdd: () => void;
  onEdit: (item: IMasterEntity) => void;
  onDelete: (item: IMasterEntity) => void;
  onToggleStatus: (item: IMasterEntity) => void;
}

export function MasterDataTable({ 
  title, 
  description, 
  data, 
  columns, 
  onAdd, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: MasterDataTableProps) {
  
  const tanstackColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      ...columns.map((col) => ({
        accessorKey: col.key,
        header: col.label,
        cell: ({ row }: any) => {
          return col.render ? col.render(row.original) : row.getValue(col.key);
        },
      })),
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: any) => {
          const status = row.original.status;
          return (
            <Badge variant={status === 'ACTIVE' ? 'default' : 'secondary'}>
              {status}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }: any) => {
          const item = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon"><MoreVerticalIcon className="w-4 h-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(item)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleStatus(item)}>
                  {item.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => onDelete(item)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [columns, onEdit, onToggleStatus, onDelete]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onAdd}><PlusIcon className="w-4 h-4 mr-2" /> Add New</Button>
        </div>
      </div>

      <DataTable 
        columns={tanstackColumns} 
        data={data} 
        searchKey="name" 
        exportable 
        exportFilename={`${title.toLowerCase().replace(/ /g, '-')}-export`}
      />
    </div>
  );
}
