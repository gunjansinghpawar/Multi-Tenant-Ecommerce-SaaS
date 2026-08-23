"use client"

import * as React from "react"
import { Skeleton } from "./skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

interface DataTableSkeletonProps {
  columnCount?: number
  rowCount?: number
  showToolbar?: boolean
}

export function DataTableSkeleton({
  columnCount = 5,
  rowCount = 10,
  showToolbar = true,
}: DataTableSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {/* Toolbar Skeleton */}
      {showToolbar && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Skeleton className="h-9 w-full max-w-sm" />
          <div className="flex items-center gap-2 ml-auto">
            <Skeleton className="h-9 w-[80px]" />
            <Skeleton className="h-9 w-[80px]" />
          </div>
        </div>
      )}

      {/* Table Skeleton */}
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full max-w-[200px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between px-2 py-4">
        <Skeleton className="h-4 w-[150px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-[90px]" />
          <Skeleton className="h-9 w-[90px]" />
        </div>
      </div>
    </div>
  )
}
