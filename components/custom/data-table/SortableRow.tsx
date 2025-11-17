"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { TableCell, TableRow } from "../../ui/table";

interface SortableRowProps<TData, TValue = unknown> {
  row: TData;
  columns: ColumnDef<TData, TValue>[];
  dragId: string;
}

export function SortableRow<TData, TValue = unknown>({
  row,
  columns,
  dragId,
}: SortableRowProps<TData, TValue>) {
  const { setNodeRef, transform, transition } = useSortable({ id: dragId });

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
    >
      {columns.map((col) => {
        // Check if column has a custom cell renderer
        const cellContent = col.cell
          ? flexRender(col.cell, {
              row: { original: row } as any,
              getValue: () =>
                "accessorKey" in col && col.accessorKey
                  ? (row as any)[col.accessorKey]
                  : undefined,
            } as any)
          : "accessorKey" in col && col.accessorKey
          ? (row as any)[col.accessorKey]
          : null;

        return (
          <TableCell
            key={
              col.id || ("accessorKey" in col ? String(col.accessorKey) : "")
            }
          >
            {cellContent}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
