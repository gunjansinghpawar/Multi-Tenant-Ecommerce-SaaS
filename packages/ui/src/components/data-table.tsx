"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as ReactTableType,
} from "@tanstack/react-table"
import { ChevronDown, ChevronLeft, ChevronRight, Download, Search, Settings2, Trash2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Button } from "./button"
import { Input } from "./input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { cn } from "@commercex/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  exportable?: boolean
  exportFilename?: string
  stickyHeader?: boolean
  bulkActions?: (table: ReactTableType<TData>) => React.ReactNode
}

function exportTableToCSV<TData>(table: ReactTableType<TData>, filename: string) {
  const headers = table.getAllLeafColumns()
    .filter(c => c.getIsVisible() && c.id !== "select" && c.id !== "actions")
    .map(c => {
      // Try to get header string if possible, otherwise use id
      return typeof c.columnDef.header === 'string' ? c.columnDef.header : c.id
    })

  const rows = table.getFilteredRowModel().rows.map(row => {
    return table.getAllLeafColumns()
      .filter(c => c.getIsVisible() && c.id !== "select" && c.id !== "actions")
      .map(c => {
        let val = row.getValue(c.id)
        if (val === null || val === undefined) return ""
        if (typeof val === 'string') {
          val = val.replace(/"/g, '""')
          return `"${val}"`
        }
        return val
      }).join(",")
  })

  const csv = [headers.join(","), ...rows].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  exportable = false,
  exportFilename = "export",
  stickyHeader = false,
  bulkActions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length

  return (
    <div className="w-full space-y-4">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {searchKey && (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${searchKey}...`}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="pl-8 bg-background w-full"
            />
          </div>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {exportable && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportTableToCSV(table, exportFilename)}
              className="h-9"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto h-9">
                <Settings2 className="mr-2 h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedRowCount > 0 && bulkActions && (
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50 animate-in fade-in slide-in-from-top-2">
          <div className="text-sm font-medium">
            {selectedRowCount} row(s) selected
          </div>
          <div className="flex items-center gap-2">
            {bulkActions(table)}
          </div>
        </div>
      )}

      {/* Table Area (Responsive Wrapper) */}
      <div className="rounded-md border bg-card overflow-hidden">
        <div className={cn("w-full overflow-auto", stickyHeader ? "max-h-[600px]" : "")}>
          <Table>
            <TableHeader className={cn(stickyHeader && "sticky top-0 z-10 bg-card shadow-sm")}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group hover:bg-muted/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination & Selection Info */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
