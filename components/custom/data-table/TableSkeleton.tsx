// components/custom/data-table/TableSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  pagination?: boolean;
}

export default function TableSkeleton({
  columns = 5,
  rows = 10,
  pagination = true,
}: TableSkeletonProps) {
  return (
    <div className="relative flex flex-col gap-4 overflow-auto">
      <div className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/70 sticky top-0 z-10">
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-8 w-full bg-gray-400" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-8 w-full bg-gray-400" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between px-4 w-full">
          <div className="hidden lg:flex flex-1">
            <Skeleton className="h-4 w-56 bg-gray-400" />
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden lg:flex items-center gap-2">
              <Skeleton className="h-4 w-24 bg-gray-400" />
              <Skeleton className="h-8 w-20 rounded-md bg-gray-400" />
            </div>
            <Skeleton className="h-4 w-24" />
            <div className="ml-auto lg:ml-0 flex items-center gap-2">
              <Skeleton className="hidden lg:block h-8 w-8 rounded-md bg-gray-400" />
              <Skeleton className="h-8 w-8 rounded-md bg-gray-400" />
              <Skeleton className="h-8 w-8 rounded-md bg-gray-400" />
              <Skeleton className="hidden lg:block h-8 w-8 rounded-md bg-gray-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
