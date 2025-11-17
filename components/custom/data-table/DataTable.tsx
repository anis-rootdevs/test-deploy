"use client";

import {
  ColumnDef,
  flexRender,
  Table as TanstackTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableRow } from "./SortableRow";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowId: (row: TData) => string;
  table: TanstackTable<TData>;
  onDataChange?: (newData: TData[]) => void; // Callback for drag-and-drop changes
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  getRowId,
  table,
  onDataChange,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState(data);

  // Sync tableData with data prop changes
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const rowIds = tableData.map(getRowId);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = tableData.findIndex((d) => getRowId(d) === active.id);
      const newIndex = tableData.findIndex((d) => getRowId(d) === over.id);
      const newData = arrayMove(tableData, oldIndex, newIndex);
      setTableData(newData);

      // Call the callback if provided
      if (onDataChange) {
        onDataChange(newData);
      }
    }
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <SortableRow
                      key={getRowId(row.original)}
                      row={row.original}
                      dragId={getRowId(row.original)}
                      columns={columns}
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </div>
  );
}
