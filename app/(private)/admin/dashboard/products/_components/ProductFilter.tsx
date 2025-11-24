"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterType } from "@/lib/types";

interface ProductFilterProps<TData> {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  disabled?: boolean;
}

export default function ProductFilter<TData>({
  filter,
  setFilter,
  disabled = false,
}: ProductFilterProps<TData>) {
  const getDisplayValue = () => {
    switch (filter) {
      case "mostLoved":
        return "Most Loved";
      case "featured":
        return "Featured";
      default:
        return "All Products";
    }
  };

  return (
    <Select value={filter} onValueChange={setFilter} disabled={disabled}>
      <SelectTrigger className="h-10 w-[180px] rounded-[4px]">
        <SelectValue placeholder="Filter by...">
          {getDisplayValue()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Products</SelectItem>
        <SelectItem value="mostLoved">Most Loved</SelectItem>
        <SelectItem value="featured">Featured</SelectItem>
      </SelectContent>
    </Select>
  );
}
