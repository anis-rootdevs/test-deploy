"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ColumnDef } from "@tanstack/react-table";
import { TableCell, TableRow } from "../ui/table";
import DragHandle from "./DragHandle";

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
        if (col.id === "drag") {
          return (
            <TableCell key={col.id}>
              <DragHandle id={dragId} />
            </TableCell>
          );
        }

        // Render other cell values
        const value = 'accessorKey' in col && col.accessorKey ? (row as any)[col.accessorKey] : null;
        return <TableCell key={col.id || ('accessorKey' in col ? String(col.accessorKey) : '')}>{value}</TableCell>;
      })}
    </TableRow>
  );
}
